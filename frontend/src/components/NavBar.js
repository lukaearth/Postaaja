'use client';
import { useEffect } from 'react';

export default function NavbarSmoothScroll() {
  useEffect(() => {
    // Easing function for smooth animation
    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    // Custom smooth scroll function
    function smoothScrollTo(targetY, duration) {
      const startY = window.pageYOffset || document.documentElement.scrollTop;
      const distance = targetY - startY;
      let startTime = null;

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutQuad(progress);

        window.scrollTo(0, startY + distance * ease);

        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      }

      requestAnimationFrame(animation);
    }

    // Handle click events for navbar links
    const handleClick = (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      console.log(`Clicked link with href=#${targetId}, text: ${e.currentTarget.textContent}`);

      if (targetSection) {
        // Special handling for 'why-choose-us' section to target testimonial card
        if (targetId === 'why-choose-us') {
          const targetTestimonialCard = targetSection.querySelector('div.testimonial-card');
          console.log('Looking for div.testimonial-card:', targetTestimonialCard ? 'Found' : 'Not found');

          if (targetTestimonialCard) {
            setTimeout(() => {
              const rect = targetTestimonialCard.getBoundingClientRect();
              const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
              const testimonialTop = rect.top + scrollTop;
              const testimonialHeight = rect.height;
              const viewportHeight = window.innerHeight;
              const navbar = document.querySelector('div.w-full.flex.items-center.justify-between');
              const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
              // Center the testimonial card in the viewport
              const scrollPosition = testimonialTop - (viewportHeight / 2) + (testimonialHeight / 2);

              smoothScrollTo(Math.max(0, scrollPosition), 1000);

              console.log({
                targetId,
                testimonialTop,
                testimonialHeight,
                viewportHeight,
                navbarHeight,
                scrollPosition,
              });
            }, 100);
            return;
          }
        }

        // Special handling for 'contact-info' section
        if (targetId === 'contact-info') {
          setTimeout(() => {
            const rect = targetSection.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const sectionTop = rect.top + scrollTop;
            const sectionHeight = rect.height;
            const viewportHeight = window.innerHeight;
            const navbar = document.querySelector('div.w-full.flex.items-center.justify-between');
            const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
            // Center the contact info in the viewport
            const scrollPosition = sectionTop - (viewportHeight / 2) + (sectionHeight / 2);

            smoothScrollTo(Math.max(0, scrollPosition), 1000);

            // Apply highlight effect
            targetSection.classList.add('contact-info-highlight');
            setTimeout(() => {
              targetSection.classList.remove('contact-info-highlight');
            }, 3000); // Remove after 3 seconds to match animation duration

            console.log({
              targetId,
              sectionTop,
              sectionHeight,
              viewportHeight,
              navbarHeight,
              scrollPosition,
            });
          }, 100);
          return;
        }

        // General handling for other sections
        const targetParagraph = targetSection.querySelector('p.text-black\\/60.font-inter');
        console.log('Looking for p.text-black\\/60.font-inter:', targetParagraph ? 'Found' : 'Not found');

        if (targetParagraph) {
          setTimeout(() => {
            const rect = targetParagraph.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const paragraphTop = rect.top + scrollTop;
            const paragraphHeight = rect.height;
            const viewportHeight = window.innerHeight;
            const navbar = document.querySelector('div.w-full.flex.items-center.justify-between');
            const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
            const scrollPosition = paragraphTop - (viewportHeight / 2) + (paragraphHeight / 2) + (navbarHeight / 2);

            smoothScrollTo(Math.max(0, scrollPosition), 1000);

            console.log({
              targetId,
              paragraphTop,
              paragraphHeight,
              viewportHeight,
              navbarHeight,
              scrollPosition,
            });
          }, 100);
        } else {
          console.log(`No specific target found in section #${targetId}, falling back to section top`);
          smoothScrollTo(targetSection.getBoundingClientRect().top + window.pageYOffset, 1500);
        }
      } else {
        console.log(`Section #${targetId} not found`);
      }
    };

    // Attach event listeners to all anchor links with href starting with '#'
    const anchors = document.querySelectorAll('a[href^="#"]');
    console.log(`Found ${anchors.length} anchor links with href starting with '#'`);
    anchors.forEach((anchor) => {
      anchor.addEventListener('click', handleClick);
    });

    // Cleanup event listeners on component unmount
    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener('click', handleClick);
      });
    };
  }, []);

  return null;
}   