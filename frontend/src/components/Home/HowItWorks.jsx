export const HowItWorks = () => {
  const steps = [
    {
      title: "Find a location",
      desc: "Browse available locker locations near you using our interactive map",
      color: "from-yellow-400 to-orange-400",
    },
    {
      title: "Book a locker",
      desc: "Select your preferred size and duration, then complete your booking",
      color: "from-orange-400 to-red-400",
    },
    {
      title: "Drop off your baggage",
      desc: "Proceed to your chosen location and drop off your baggage to our friendly attendant",
      color: "from-purple-500 to-indigo-400",
    },
  ];

  return (
    <div className="how-section">
      <h2 className="how-title">How it works</h2>

      <p className="how-subtext">Get started in three simple steps</p>

      <div className="how-steps">
        {steps.map((s, i) => (
          <div key={i} className="how-card">
            <div className="how-icon-wrapper">
              <div className={`how-icon bg-linear-to-br ${s.color}`}>
                {i + 1}
              </div>
            </div>

            <h3 className="how-card-title">{s.title}</h3>

            <p className="how-card-text">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
