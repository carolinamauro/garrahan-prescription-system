export function AgeCell({ anios, dias }) {
  if (anios === null || dias === null) {
    return <span>No informa</span>;
  }

  return <span>{`${anios} años y ${dias} días`}</span>;
}
