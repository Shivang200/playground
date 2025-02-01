import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 text-center">
        <p>&copy; 2025 GhostNet. All rights reserved.</p>
        <div className="mt-4">
          <a href="#contact" className="text-gray-400 hover:text-white">Contact Us</a> | <a href="#privacy" className="text-gray-400 hover:text-white">Privacy Policy</a>
        </div>
      </footer>
  )
}

export default Footer