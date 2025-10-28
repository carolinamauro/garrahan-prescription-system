export function ProtocolCell({ activeProtocol }) {
  return (
    <span>{activeProtocol ? activeProtocol.nombre : '-'}</span>
  );
}
