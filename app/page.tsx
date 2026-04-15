import AppShell from "./AppShell";

export default function Home() {
  return (
    <main className="w-full h-full flex items-center justify-center">
      {/* On mobile: full screen. On desktop: phone frame */}
      <div
        className="
          w-full h-full bg-[#faf7f0] flex flex-col overflow-hidden
          md:w-[390px] md:h-[844px] md:rounded-[44px] md:shadow-2xl md:border-4 md:border-gray-200
        "
        style={{ maxHeight: '100vh' }}
      >
        <AppShell />
      </div>
    </main>
  );
}
