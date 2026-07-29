interface GreetingProps {
  name: string;
}

function getTimeOfDay(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Morning";
  if (hour < 17) return "Afternoon";
  if (hour < 21) return "Evening";
  return "Night";
}

function Greeting({ name }: GreetingProps) {
  return (
    <div className="greeting">
      <h1 className="greeting-text">
        Good {getTimeOfDay()}, {name}
      </h1>
    </div>
  );
}

export default Greeting;
