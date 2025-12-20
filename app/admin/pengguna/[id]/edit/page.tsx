import Hero from "./components/hero";
import Form from "./components/form";

export default function EditPengguna() {
  return (
    <>
      <span className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/motion-grid.svg')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center opacity-5" />
      <Hero />
      <Form />
    </>
  );
}
