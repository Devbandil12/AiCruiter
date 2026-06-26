import LoadingThreeDotsJumping from "@/app/loading";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-slate-50 to-purple-50">
      <LoadingThreeDotsJumping />
      <p className="text-sm text-gray-400 font-medium">Loading interview...</p>
    </div>
  );
}
