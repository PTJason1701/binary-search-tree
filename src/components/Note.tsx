import { ReactElement } from 'react';

export default function Note() {
  return (
    <section className="fixed bottom-0 left-0 flex flex-col p-1 scale-90">
      <Annotate>
        <div className="w-4 h-1 bg-red-600 rounded-full"></div>
        <p>Right branch</p>
      </Annotate>
      <Annotate>
        <div className="w-4 h-1 bg-blue-600 rounded-full"></div>
        <p>Left branch</p>
      </Annotate>
      <Annotate>
        <div className="w-4 h-4 bg-black rounded-full"></div>
        <p>Node</p>
      </Annotate>
      <Annotate>
        <div className="w-4 h-4 bg-[#663399] rounded-full"></div>
        <p>Last node travelled before failing</p>
      </Annotate>
      <Annotate>
        <div className="w-4 h-4 bg-yellow-300 rounded-full"></div>
        <p>Travelled node</p>
      </Annotate>
      <Annotate>
        <div className="w-4 h-4 bg-green-600 rounded-full"></div>
        <p>Destination node</p>
      </Annotate>
    </section>
  );
}

function Annotate(props: {
  children: ReactElement | [ReactElement, ReactElement];
}) {
  return <div className="flex gap-2 items-center">{props.children}</div>;
}
