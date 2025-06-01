import { Plane } from 'lucide-react';

export function Logo() {
  return (
    <>
      <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
        <Plane className="h-6 w-6 text-white" />
      </div>
      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        FlyTicket
      </span>
    </>
  );
}
