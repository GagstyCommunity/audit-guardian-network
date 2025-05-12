
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, Menu as MenuIcon, X } from 'lucide-react';
import { colorPalette } from '../../types/auth.types';
import { Button } from '@/components/ui/button';

const PublicNavigation: React.FC = () => {
  const { authState } = useAuth();
  const { isAuthenticated } = authState;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8" style={{ color: colorPalette.primaryPurple }} />
            <span className="text-xl font-bold hidden sm:inline-block" style={{ color: colorPalette.primaryPurple }}>
              Bank Correspondent Portal
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink 
              to="/" 
              end
              className={({isActive}) => 
                `px-3 py-2 text-sm font-medium rounded-md ${
                  isActive 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/how-it-works" 
              className={({isActive}) => 
                `px-3 py-2 text-sm font-medium rounded-md ${
                  isActive 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              How It Works
            </NavLink>
            <NavLink 
              to="/become-csp" 
              className={({isActive}) => 
                `px-3 py-2 text-sm font-medium rounded-md ${
                  isActive 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              Become a CSP
            </NavLink>
            <NavLink 
              to="/customer-corner" 
              className={({isActive}) => 
                `px-3 py-2 text-sm font-medium rounded-md ${
                  isActive 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              Customer Corner
            </NavLink>
            <NavLink 
              to="/csr-impact" 
              className={({isActive}) => 
                `px-3 py-2 text-sm font-medium rounded-md ${
                  isActive 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              CSR Impact
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({isActive}) => 
                `px-3 py-2 text-sm font-medium rounded-md ${
                  isActive 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              Contact
            </NavLink>
            
            {isAuthenticated ? (
              <Button 
                onClick={() => {}}
                className="text-white" 
                style={{ backgroundColor: colorPalette.accentGreen }}
              >
                Dashboard
              </Button>
            ) : (
              <Button 
                asChild
                className="text-white" 
                style={{ backgroundColor: colorPalette.primaryPurple }}
              >
                <NavLink to="/login">Login</NavLink>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <MenuIcon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pt-2 pb-3 space-y-1">
          <NavLink 
            to="/" 
            end
            className={({isActive}) => 
              `block px-4 py-2 text-base font-medium ${
                isActive 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink 
            to="/how-it-works" 
            className={({isActive}) => 
              `block px-4 py-2 text-base font-medium ${
                isActive 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            How It Works
          </NavLink>
          <NavLink 
            to="/become-csp" 
            className={({isActive}) => 
              `block px-4 py-2 text-base font-medium ${
                isActive 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Become a CSP
          </NavLink>
          <NavLink 
            to="/customer-corner" 
            className={({isActive}) => 
              `block px-4 py-2 text-base font-medium ${
                isActive 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Customer Corner
          </NavLink>
          <NavLink 
            to="/csr-impact" 
            className={({isActive}) => 
              `block px-4 py-2 text-base font-medium ${
                isActive 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            CSR Impact
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({isActive}) => 
              `block px-4 py-2 text-base font-medium ${
                isActive 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </NavLink>
          
          {isAuthenticated ? (
            <Button 
              onClick={() => {}}
              className="w-full text-white mt-3 mx-4"
              style={{ backgroundColor: colorPalette.accentGreen }}
            >
              Dashboard
            </Button>
          ) : (
            <Button 
              asChild
              className="w-full text-white mt-3 mx-4"
              style={{ backgroundColor: colorPalette.primaryPurple }}
            >
              <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>Login</NavLink>
            </Button>
          )}
        </div>
      )}
    </nav>
  );
};

export default PublicNavigation;
