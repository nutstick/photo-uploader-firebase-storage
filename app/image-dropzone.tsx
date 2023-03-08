'use client';
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  type UploadTask,
} from 'firebase/storage';
import * as Progress from '@radix-ui/react-progress';
import { CheckIcon } from '@radix-ui/react-icons';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { storage } from './firebase';
import clsx from 'clsx';

type ImageFile = {
  file: File;
  fileName: string;
  uploadTask: UploadTask;
};

function FileItem({ file }: { file: ImageFile }) {
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState<string | undefined>(undefined);

  useEffect(() => {
    file.uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(file.uploadTask.snapshot.ref).then((downloadURL) => {
          setDownloadURL(downloadURL);
        });
      }
    );
  }, [file.uploadTask]);

  return (
    <li
      className={clsx(
        'hover:bg-stone-100 hover:dark:bg-slate-900 px-4 py-2 rounded transition-colors ease-in-out',
        downloadURL && 'text-green-500'
      )}
    >
      <a
        href={downloadURL}
        className="flex flex-row justify-between items-center"
      >
        <>{file.fileName}</>
        {downloadURL ? (
          <div>
            <CheckIcon />
          </div>
        ) : (
          <Progress.Root
            className="relative overflow-hidden bg-stone-100 dark:bg-zinc-800 rounded-full w-20 h-2"
            value={progress}
            style={{
              transform: 'translateZ(0)',
            }}
          >
            <Progress.Indicator
              className="bg-green-300 dark:bg-white w-full h-full transition-all ease-in"
              style={{ transform: `translateX(-${100 - progress}%)` }}
            />
          </Progress.Root>
        )}
      </a>
    </li>
  );
}

export function ImagesDropzone() {
  const [imageList, setImageList] = useState<ImageFile[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const newImages: ImageFile[] = Array.from(acceptedFiles).map((file) => {
          return {
            file: file,
            fileName: file.name,
            uploadTask: uploadBytesResumable(ref(storage, file.name), file),
          };
        });

        setImageList((prevState) => [...prevState, ...newImages]);
      }
    },
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
    },
  });

  return (
    <div className="flex flex-col gap-12">
      <div
        {...getRootProps({ className: '' })}
        className="bg-stone-100 dark:bg-slate-900 p-6 rounded cursor-pointer"
      >
        <input {...getInputProps()} />
        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
        <em>(Only *.jpeg and *.png images will be accepted)</em>
      </div>
      <aside>
        <h4 className="mb-4">Accepted files</h4>
        <ul>
          {imageList.map((file: ImageFile) => (
            <FileItem key={file.fileName} file={file} />
          ))}
        </ul>
      </aside>
    </div>
  );
}
