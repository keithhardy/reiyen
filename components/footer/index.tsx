export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="flex justify-between p-4">
        <p className="text-sm font-medium tracking-wide">
          {currentYear} Reiyen | Created by{' '}
          <a
            href="mailto:keithjnrhardy@gmail.com?subject=Inquiry%20from%20Reiyen%20Website%20Visitor"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            Keith
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
