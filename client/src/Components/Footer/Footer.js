import React from 'react';
import './Footer.css'

function Footer() {
  return (
          <div className="footer">
          <div className="footer-container">
            <div className="footer-column">
              <h2>Course Vendors</h2>
              <ul>
                <li><a href="https://coursekhoj.com/course-brand/bada-business/">Bada Business</a></li>
                <li><a href="https://coursekhoj.com/course-brand/pw-skills/">PW Skills</a></li>
                <li><a href="https://coursekhoj.com/course-brand/simpli-learnskill-up/">SimpliLearn</a></li>
                <li><a href="https://coursekhoj.com/course-brand/nse-academy/">NSE Acaademy</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h2>Categories</h2>
              <ul>
                <li><a href="https://coursekhoj.com/?min_price=0&amp;max_price=0&amp;s=free&amp;post_type=product">Free Courses</a></li>
                <li><a href="https://coursekhoj.com/course-category/business/">Business Courses</a></li>
                <li><a href="https://coursekhoj.com/course-category/finance-and-stock-market/stock-market/">Stock Market</a></li>
                <li><a href="https://coursekhoj.com/course-category/value-pack/">Best Deals</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h2>Quick Links</h2>
              <ul>
                <li><a href="https://coursekhoj.com/about/">About Us</a></li>
                <li><a href="https://coursekhoj.com/contact-us-2/">Contact Us</a></li>
                <li><a href="https://coursekhoj.com/privacy-policy/">Privacy Policy</a></li>
                <li><a href="https://coursekhoj.com/fair-use-policy/">Fair Use Policy</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h2>Follow us on !</h2>
              <div className="social-icons">
                <a href="https://instagram.com/coursekhoj?igshid=ZDdkNTZiNTM=" target="_blank" rel="noopener" className="social-icon">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/in/course-khoj-55a535273" target="_blank" rel="noopener" className="social-icon">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="footer-divider">Made with 💝 in India <br />© Copyright 2024, <a href="https://coursekhoj.com"><strong>OJSANT Technologies Pvt. Ltd.</strong></a></div>
        </div>
  )
}

export default Footer