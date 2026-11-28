import { asset } from "../sumi/hooks";

export default function Footer() {
  return (
    <footer className="mt-16 pb-10 pt-8 sm:mt-20" aria-label="Site footer">
      <div aria-hidden="true" className="footer-shrine mx-auto -mb-6 w-full max-w-[920px] sm:-mb-12">
        <img
          src={asset("images/footer/torii-shrine.webp")}
          alt=""
          width={1182}
          height={400}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="block h-auto w-full select-none"
        />
      </div>
      <div className="flex flex-col justify-between gap-5 border-t px-1 pt-7 sm:flex-row sm:items-center sm:gap-6" style={{ borderColor: "var(--gold-line)" }}>
        <div className="text-center sm:text-left">
          <a href="/#home" className="sumi-signature block transition-colors hover:!text-[color:var(--gold-deep)]">Jonaidah Caris</a>
          <a href="/#home" className="sumi-brand mt-1 block !text-[1rem] transition-colors hover:!text-[color:var(--gold-deep)]">jmcaris<span className="sumi-accent">.dev</span></a>
        </div>
        <p className="sumi-text-sm !text-[0.72rem]">© {new Date().getFullYear()} All rights reserved.</p>
        <nav aria-label="Home sections" className="flex flex-wrap justify-center gap-5 sm:justify-start">
          {[["Projects", "/#projects"], ["About", "/#about"], ["Tools", "/#tools"], ["Testimonials", "/#testimonials"]].map(([label, href]) => (
            <a key={label} href={href} className="sumi-label !text-[0.6rem] transition-colors hover:!text-[color:var(--gold-deep)]">{label}</a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
