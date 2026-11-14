/*
  The fanned stack of white pages from the Figma "Things I'm Building" cards.
  Position it with className (left/top/translate). Needs a `group` ancestor
  for the hover fan-out.
*/
function Bar({ className }: { className: string }) {
  return <div className={`rounded-2xl bg-[#ededed] ${className}`} />;
}

function Page({ className, bar, dot }: { className: string; bar: string; dot: string }) {
  return (
    <div
      className={`absolute h-60 w-52 overflow-hidden rounded-md border border-black/10 bg-[#ffffff] px-2 pb-3 pt-4 ${className}`}
    >
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            <Bar className={`w-10 ${bar}`} />
            <Bar className={`flex-1 ${bar}`} />
          </div>
          <Bar className={`w-full ${bar}`} />
          <Bar className={`w-full ${bar}`} />
        </div>
        <div className="flex flex-col gap-1">
          <Bar className={`w-full ${bar}`} />
          <Bar className={`w-full ${bar}`} />
          <Bar className={`w-full ${bar}`} />
        </div>
        <div className="flex items-center gap-1">
          <div className={`size-4 rounded-full ${dot}`} />
          <Bar className={`w-8 ${bar}`} />
        </div>
      </div>
    </div>
  );
}

export default function PageStack({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`absolute h-64 w-72 ${className}`}>
      <Page
        bar="h-5"
        dot="bg-[#ea3e83]"
        className="left-0 top-[23px] origin-top-left -rotate-[6.52deg] transition-transform duration-300 motion-safe:group-hover:-rotate-[9deg]"
      />
      <Page
        bar="h-4"
        dot="bg-[#be79f0]"
        className="left-[42px] top-[17px] origin-top-left -rotate-[3.26deg] transition-transform duration-300 motion-safe:group-hover:-rotate-[5deg]"
      />
      <Page bar="h-2.5" dot="bg-emerald-400" className="left-[84px] top-[11px]" />
    </div>
  );
}