import './globals.css';

export const metadata = {
  title: 'นิ้ง upload',
  description: 'นิ้ง upload รูปด้วย',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
