
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  const benefits = [
    {
      title: "Environmental Impact",
      description: "Reduce landfill waste and conserve natural resources by recycling properly.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-eco">
          <path d="M12 3a9 9 0 0 1 9 9"></path>
          <path d="M3 12a9 9 0 0 1 9-9"></path>
          <path d="m16 16-4-4"></path>
          <path d="M3 17a9.06 9.06 0 0 0 10 1"></path>
          <circle cx="7.5" cy="13.5" r=".5"></circle>
          <circle cx="12" cy="9" r=".5"></circle>
          <circle cx="16.5" cy="13.5" r=".5"></circle>
          <circle cx="12" cy="19" r=".5"></circle>
        </svg>
      ),
    },
    {
      title: "Convenient Scheduling",
      description: "Choose a time that works best for you with our flexible booking system.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-eco">
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
          <line x1="16" x2="16" y1="2" y2="6"></line>
          <line x1="8" x2="8" y1="2" y2="6"></line>
          <line x1="3" x2="21" y1="10" y2="10"></line>
          <path d="m9 16 2 2 4-4"></path>
        </svg>
      ),
    },
    {
      title: "Waste Tracking",
      description: "Keep track of your recycling efforts and see the positive impact you're making.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-eco">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="m22 11-2 2-2-2"></path>
          <path d="M16 11h2a2 2 0 0 1 2 2v1"></path>
        </svg>
      ),
    },
  ];

  const wasteTypes = [
    {
      name: "Paper & Cardboard",
      description: "Newspapers, magazines, cardboard boxes",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-earth-dark">
          <path d="M21 8v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8"></path>
          <path d="M3 4h18v4H3z"></path>
          <path d="M10 12h4"></path>
        </svg>
      ),
    },
    {
      name: "Plastic",
      description: "Bottles, containers, packaging",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-earth-dark">
          <path d="M9 3v1"></path>
          <circle cx="9" cy="7" r="3"></circle>
          <path d="M9 10v11"></path>
          <path d="M15 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
          <path d="M15 10v11"></path>
        </svg>
      ),
    },
    {
      name: "Glass",
      description: "Bottles, jars, containers",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-earth-dark">
          <path d="M8 21h8"></path>
          <path d="M12 15v6"></path>
          <path d="M17 3h1v4h-1"></path>
          <path d="M6 3h1v4H6"></path>
          <path d="M11 3h2"></path>
          <path d="M5 7h14"></path>
          <path d="M5 11a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-4H5v4Z"></path>
        </svg>
      ),
    },
    {
      name: "E-Waste",
      description: "Electronics, batteries, cables",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-earth-dark">
          <rect width="18" height="14" x="3" y="6" rx="2"></rect>
          <path d="M12 6v14"></path>
          <path d="M14 15a2 2 0 0 0-4 0"></path>
          <path d="M6.5 9.5h.01"></path>
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-pattern"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Recycle Smarter, <span className="text-eco">Not Harder</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Schedule a convenient drop-off time for your recyclables and contribute to a cleaner, 
                greener future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="font-medium">
                  <Link to="/book">Book a Time Slot</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="#how-it-works">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden shadow-xl animate-fade-in">
                <img 
                  src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                  alt="Recycling materials" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-eco text-white p-4 rounded shadow-lg hidden md:flex items-center gap-2">
                <span className="text-xl font-bold">100+</span>
                <span className="text-sm">Drop-offs<br/>this month</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6" id="how-it-works">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Use Eco-Drop?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our recycling drop-off service makes it easy to dispose of your recyclables responsibly while 
              saving you time and helping the environment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-border/50 transition-all hover:border-eco/50 hover:shadow-md">
                <CardHeader>
                  <div className="mb-2">{benefit.icon}</div>
                  <CardTitle>{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Waste Types */}
      <section className="py-20 px-6 bg-muted">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What We Accept</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We accept a wide variety of recyclable materials. Sort your items correctly for more 
              efficient processing.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wasteTypes.map((type, index) => (
              <div 
                key={index} 
                className="bg-card p-6 rounded-lg shadow-sm border border-border/50 flex flex-col items-center text-center hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{type.icon}</div>
                <h3 className="text-xl font-medium mb-2">{type.name}</h3>
                <p className="text-muted-foreground text-sm">{type.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link to="/book">Book Your Drop-off Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="bg-eco/10 rounded-xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
                <p className="text-muted-foreground mb-6">
                  Join our community of eco-conscious individuals and schedule your first recycling drop-off today.
                </p>
                <Button asChild size="lg">
                  <Link to="/book">Book a Time Slot</Link>
                </Button>
              </div>
              <div className="flex justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-full bg-eco flex items-center justify-center text-white font-bold">
                      JD
                    </div>
                    <div>
                      <h3 className="font-medium">Jane Doe</h3>
                      <p className="text-sm text-muted-foreground">Eco-Drop User</p>
                    </div>
                  </div>
                  <blockquote className="text-muted-foreground italic">
                    "I love how easy it is to schedule my recycling drop-offs. The booking system is intuitive and 
                    the staff is always friendly. Eco-Drop has made recycling a seamless part of my routine!"
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
