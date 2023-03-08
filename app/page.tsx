import { Inter } from 'next/font/google';
import clsx from 'clsx';
import styles from './page.module.css';
import { ImagesDropzone } from './image-dropzone';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={clsx(
        'flex flex-col items-center gap-12 p-24 min-h-screen',
        inter.className
      )}
    >
      <h1 className="text-4xl">นิ้ง</h1>
      <ImagesDropzone />
    </main>
  );
}
