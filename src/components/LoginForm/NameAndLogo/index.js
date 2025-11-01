export function NameAndLogo() {
  return (
    <div className="flex items-center gap-2 font-medium">
      <div className="bg-primary text-primary-foreground flex
      h-8 w-8 items-center justify-center rounded-md">
        <img
          src="/menu_icon.svg"
          alt="logo"
          className="w-8 h-8"
        />
      </div>
            Garrahan
    </div>
  );
}
