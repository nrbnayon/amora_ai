import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <header className="bg-white/95 backdrop-blur-sm  z-50 px-2 py-5 md:py-7 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-primary text-xl md:text-2xl font-bold">
          Amora AI
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              window.location.href = "/sign-up";
            }}
            className="border-[#1A1A1A] w-24 sm:w-28 md:w-36 p-3 md:p-4 text-sm md:text-base text-foreground hover:text-white hover:bg-primary/90 transition-colors"
          >
            Sign up
          </Button>
          <Button
            size="lg"
            onClick={() => {
              window.location.href = "/sign-in";
            }}
            className="bg-primary w-24 sm:w-28 md:w-36 p-3 md:p-4 text-sm md:text-base text-white hover:bg-primary/90 transition-colors"
          >
            Sign in
          </Button>
        </div>
      </div>
    </header>
  );
}
