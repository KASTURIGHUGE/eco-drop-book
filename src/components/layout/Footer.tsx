
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted py-8 mt-auto">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-full bg-eco p-1.5">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-white"
                >
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                  <path d="M8.5 8.5a10 10 0 0 0 11 11"></path>
                </svg>
              </div>
              <span className="font-bold text-xl">Eco-Drop</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Making recycling accessible and convenient for everyone.
            </p>
            <p className="text-sm text-muted-foreground">
              © {currentYear} Eco-Drop. All rights reserved.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-base mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/book" className="hover:text-foreground transition-colors">
                  Book a Slot
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-foreground transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-base mb-4">Contact</h3>
            <address className="not-italic text-sm text-muted-foreground">
              <p>123 Green Street</p>
              <p>Eco City, EC 12345</p>
              <p className="mt-2">Phone: (123) 456-7890</p>
              <p>Email: info@eco-drop.com</p>
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
