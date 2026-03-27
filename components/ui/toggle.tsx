export default function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return <button onClick={onChange}>{checked ? "On" : "Off"}</button>;
}
