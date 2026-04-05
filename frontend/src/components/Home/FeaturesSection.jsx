export const FeaturesSection = () => {
  const features = [
    {
      title: "Secure storage",
      desc: "Security system to keep your belongings safe and protected",
      color: "bg-yellow-400",
      icon: "🔒",
    },
    {
      title: "Multiple locations",
      desc: "Find lockers at convenient locations across the city, wherever you need them",
      color: "bg-orange-400",
      icon: "📍",
    },
    {
      title: "Easy access",
      desc: "Access your locker through our friendly attendants",
      color: "bg-purple-500",
      icon: "⏰",
    },
    {
      title: "Easy booking",
      desc: "Book and manage your lockers through our simple, intuitive interface",
      color: "bg-green-500",
      icon: "🛡️",
    },
  ];

  return (
    <section className="home-section">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Why choose Lockatoo?
        </h2>

        <p className="mt-3 text-gray-600">
          Simple, secure, and convenient locker rentals at your fingertips
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <div className={`feature-icon ${f.color}`}>{f.icon}</div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                {f.title}
              </h3>

              <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
