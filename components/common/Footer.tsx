import { Send, Facebook, Instagram } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const linksData = [
  { label: "FAQs", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Reviews", href: "#" },
];

const contactInfoData = [
  { text: "(000) 000-0000" },
  { text: "example@gmail.com" },
  { text: "24 Royal Lane, Mesa, New Jersey 45435" },
];

export const Footer = () => {
  return (
    <div className='bg-primary w-full'>
      <footer className='flex flex-col w-full items-center max-w-7xl mx-auto pt-16 pb-8 bg-primary'>
        {/* Main Footer Content */}
        <div className='grid grid-cols-4 gap-12 w-full mb-16'>
          {/* Brand Section */}
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
              <h2 className='font-semibold text-white text-3xl leading-tight'>
                Amora AI
              </h2>
              <p className='font-normal text-white text-sm leading-relaxed'>
                Making wedding planning effortless with the power of artificial
                intelligence.
              </p>
            </div>

            {/* Social Media Icons */}
            <div className='flex items-center gap-4'>
              <a
                href='#'
                className='w-8 h-8 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors'
                aria-label='Facebook'
              >
                <Facebook className='w-4 h-4' />
              </a>
              <a
                href='#'
                className='w-8 h-8 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors'
                aria-label='Pinterest'
              >
                <svg
                  className='w-4 h-4'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z' />
                </svg>
              </a>
              <a
                href='#'
                className='w-8 h-8 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors'
                aria-label='Twitter'
              >
                <svg
                  className='w-4 h-4'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                </svg>
              </a>
              <a
                href='#'
                className='w-8 h-8 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors'
                aria-label='Instagram'
              >
                <Instagram className='w-4 h-4' />
              </a>
            </div>
          </div>

          {/* Links Section */}
          <nav className='flex flex-col gap-6'>
            <h3 className='font-semibold text-white text-xl leading-tight'>
              Links
            </h3>
            <ul className='flex flex-col gap-3'>
              {linksData.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className='font-normal text-white text-base leading-relaxed hover:underline'
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info Section */}
          <div className='flex flex-col gap-6'>
            <h3 className='font-semibold text-white text-xl leading-tight'>
              Contact Info
            </h3>
            <address className='flex flex-col gap-3 not-italic'>
              {contactInfoData.map((info, index) => (
                <p
                  key={index}
                  className='font-normal text-white text-base leading-relaxed'
                >
                  {info.text}
                </p>
              ))}
            </address>
          </div>

          {/* Newsletter Section */}
          <div className='flex flex-col gap-6'>
            <h3 className='font-semibold text-white text-xl leading-tight whitespace-nowrap'>
              Get the latest Updates
            </h3>
            <div className='flex items-center'>
              <Input
                type='email'
                placeholder='Email Address'
                className='h-12 flex-1 rounded-l-lg rounded-r-none border-0 bg-white text-base placeholder:text-gray-400'
              />
              <Button
                size='lg'
                className='h-12 bg-[#e6cba8] hover:bg-[#d4b896] rounded-r-lg rounded-l-none px-4'
              >
                <Send className='w-5 h-5 text-primary' />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className='flex items-center justify-between w-full pt-8 border-t border-white/20'>
          <p className='font-normal text-white text-sm leading-relaxed'>
            © 2025 Amora AI. All rights reserved.
          </p>

          <div className='flex items-center gap-2'>
            <a
              href='#'
              className='font-normal text-white text-sm leading-relaxed underline hover:opacity-80'
            >
              Terms & Conditions
            </a>
            <span className='font-normal text-white text-sm leading-relaxed'>
              and
            </span>
            <a
              href='#'
              className='font-normal text-white text-sm leading-relaxed underline hover:opacity-80'
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
