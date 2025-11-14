// src/components/DiveInSection/DiveInSection.jsx
import React, { useEffect, useRef } from "react";
import "./DiveInSection.css";

const DiveInSection = () => {
  const rootRef = useRef(null);

  // Scroll animation: add "is-visible" when elements enter the viewport
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const animatedElements = root.querySelectorAll("[data-w-id]");

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries, observerInstance) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observerInstance.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      animatedElements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    } else {
      // Fallback: if IntersectionObserver is not supported, just show everything
      animatedElements.forEach((el) => el.classList.add("is-visible"));
    }
  }, []);

  const projectData = [
    {
      image:
        "https://cdn.prod.website-files.com/6501f1891917bde75ab542ee/68c13393a3119407825526b7_Graph.avif",
      imageSizes: "100vw",
      imageSrcSet:
        "https://cdn.prod.website-files.com/6501f1891917bde75ab542ee/68c13393a3119407825526b7_Graph-p-500.avif 500w, https://cdn.prod.website-files.com/6501f1891917bde75ab542ee/68c13393a3119407825526b7_Graph.avif 1200w",
      pills: ["Web Design/Development", "UI/UX Design", "Configurator"],
      title: "Drivelodge",
      description:
        "Founded as a passion project by enthusiasts David and Joanne, Drivelodge has built on its reputation for crafting high-quality high-top and elevating camper van roofs to become a 30-strong team of designers and engineers serving a nationwide customer base.",
      href: "/work/drivelodge",
    },
    {
      image:
        "https://cdn.prod.website-files.com/6501f1891917bde75ab542ee/65411cf4f8251ab33a7d442b_HACIEN%20Thumbnail.webp",
      imageSizes: "100vw",
      imageSrcSet:
        "https://cdn.prod.website-files.com/6501f1891917bde75ab542ee/65411cf4f8251ab33a7d442b_HACIEN%20Thumbnail-p-500.webp 500w, https://cdn.prod.website-files.com/6501f1891917bde75ab542ee/65411cf4f8251ab33a7d442b_HACIEN%20Thumbnail-p-800.webp 800w, https://cdn.prod.website-files.com/6501f1891917bde75ab542ee/65411cf4f8251ab33a7d442b_HACIEN%20Thumbnail.webp 1002w",
      pills: [
        "Webflow Development",
        "UI/UX Design",
        "Webflow Training",
        "Graphic Design",
      ],
      title: "Hacien",
      description:
        "HACIEN is a premium tequila brand supplying high-end hospitality and retail locations worldwide. They approached Phunk to undertake a comprehensive design project comprising web, packaging and marketing assets as well as 3D renders of their signature bottles.",
      href: "/work/hacien",
    },
    {
      image:
        "https://cdn.prod.website-files.com/6501f1891917bde75ab542ee/65411d0755e48e6b5ec08e9a_Mobilio%20Thumbnail.webp",
      imageSizes: "100vw",
      imageSrcSet:
        "https://cdn.prod.website-files.com/6501f1891917bde75ab542ee/65411d0755e48e6b5ec08e9a_Mobilio%20Thumbnail-p-500.webp 500w, https://cdn.prod.website-files.com/6501f1891917bde75ab542ee/65411d0755e48e6b5ec08e9a_Mobilio%20Thumbnail-p-800.webp 800w, https://cdn.prod.website-files.com/6501f1891917bde75ab542ee/65411d0755e48e6b5ec08e9a_Mobilio%20Thumbnail.webp 1002w",
      pills: [
        "Splash Screens",
        "Illustrations",
        "Graphic Design",
        "Lottie Animations",
        "Webflow Training",
      ],
      title: "Mobilleo",
      description:
        "Mobilleo is a SaaS solution making it easy for organisations to manage global business travel for their employees. The team at Mobilleo approached Phunk to provide a range of design and illustration services, building on their existing brand, for use across their website and app.",
      href: "/work/mobillio",
    },
    {
      image:
        "https://cdn.prod.website-files.com/6501f1891917bde75ab542ee/65411d16c21a037f3b0a622a_Mannson%20Thumbnail.webp",
      imageSizes: "100vw",
      imageSrcSet:
        "https://cdn.prod.website-files.com/6501f1891917bde75ab542ee/65411d16c21a037f3b0a622a_Mannson%20Thumbnail-p-500.webp 500w, https://cdn.prod.website-files.com/6501f1891917bde75ab542ee/65411d16c21a037f3b0a622a_Mannson%20Thumbnail-p-800.webp 800w, https://cdn.prod.website-files.com/6501f1891917bde75ab542ee/65411d16c21a037f3b0a622a_Mannson%20Thumbnail.webp 1002w",
      pills: [
        "Webflow Development",
        "UI/UX Design",
        "Webflow Training",
        "Graphic Design",
      ],
      title: "Mannson Freight",
      description:
        "Mannson Freight operates import and export consolidation services involving sea freight. They engaged Phunk to rebrand their corporate identity and develop a new higher-performance website, as well as a custom-built portal — MFS Pro— including ongoing support.",
      href: "/work/mannson-freight",
    },
    {
      image:
        "https://cdn.prod.website-files.com/6501f1891917bde75ab542ee/65411d311c63649d5c6843d5_Boxiq%20Thumbnail.webp",
      imageSizes: "100vw",
      imageSrcSet:
        "https://cdn.prod.website-files.com/6501f1891917bde75ab542ee/65411d311c63649d5c6843d5_Boxiq%20Thumbnail-p-500.webp 500w, https://cdn.prod.website-files.com/6501f1891917bde75ab542ee/65411d311c63649d5c6843d5_Boxiq%20Thumbnail-p-800.webp 800w, https://cdn.prod.website-files.com/6501f1891917bde75ab542ee/65411d311c63649d5c6843d5_Boxiq%20Thumbnail.webp 1002w",
      pills: [
        "Webflow Development",
        "UI/UX Design",
        "Webflow Training",
        "Graphic Design",
      ],
      title: "BOX iQ",
      description:
        "BOXiQ Performance Center in Dubai is a globally recognised boxing gym — hosting icons like Tyson Fury and Oleksandr Usyk. Working with Phunk, they now have a high-quality digital presence to match the prestige of their brand.",
      href: "/work/box-iq",
    },
    {
      image:
        "https://cdn.prod.website-files.com/6501f1891917bde75ab542ee/65411d3f05b871765a7cac0c_Honest%20Watch%20Thumbnail.webp",
      imageSizes: "100vw",
      imageSrcSet:
        "https://cdn.prod.website-files.com/6501f1891917bde75ab542ee/65411d3f05b871765a7cac0c_Honest%20Watch%20Thumbnail-p-500.webp 500w, https://cdn.prod.website-files.com/6501f1891917bde75ab542ee/65411d3f05b871765a7cac0c_Honest%20Watch%20Thumbnail-p-800.webp 800w, https://cdn.prod.website-files.com/6501f1891917bde75ab542ee/65411d3f05b871765a7cac0c_Honest%20Watch%20Thumbnail.webp 1002w",
      pills: [
        "Webflow Development",
        "Visual Identity",
        "Packaging",
        "Apparel & Merchandise",
      ],
      title: "The Honest Watch Dealer",
      description:
        "The Honest Watch Dealer is a luxury watch expert renowned for his popular YouTube channel, as well as founding The Luxury Watch Company. Charlie (his real name) engaged Phunk to develop a brand identity for his channel, with applications across a range of merchandise.",
      href: "/work/honest-watch-dealer",
    },
  ];

  const arrowSvg = (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0.5H8" stroke="white" />
      <path d="M7.5 0V8" stroke="white" />
      <path d="M7 1L0.5 7.5" stroke="white" />
    </svg>
  );

  return (
    <section className="home_dive-in" ref={rootRef}>
      <div className="home_dive-in-inner">
        <div className="home_header-block is-work">
          <h2
            data-w-id="c8573a9f-db0a-60df-b565-c03c441f5f45"
            className="heading_standard"
          >
            Dive into the <span className="span_gradient">work.</span>
          </h2>
          <p
            data-w-id="c8573a9f-db0a-60df-b565-c03c441f5f49"
            className="work-paragraph"
          >
            As creatives ourselves, we know that what you really want to see is the work we've
            actually put live. Here's a showcase of some of our recent projects, across a range of
            sectors.
          </p>
        </div>

        <div className="home_dive-in-list">
          {projectData.map((project, index) => (
            <div
              key={index}
              className="home_dive-in-row"
              data-w-id={`row-${index}`}   /* this is what the effect targets */
            >
              <div className="home_dive-in_image">
                <img
                  src={project.image}
                  loading="lazy"
                  sizes={project.imageSizes}
                  srcSet={project.imageSrcSet}
                  alt={project.title}
                  className="image_normal"
                />
              </div>

              <div className="home_dive-in_content">
                <div className="pill_list">
                  {project.pills.map((pill, pillIndex) => (
                    <div key={pillIndex} className="pill-item">
                      <div className="pill-item-inner">{pill}</div>
                    </div>
                  ))}
                </div>

                <h2 className="heading-style-h2 text-color-white">
                  <a href={project.href}>{project.title}</a>
                </h2>

                <p>
                  <a href={project.href}>{project.description}</a>
                </p>

                <a href={project.href} className="home_dive-in_link w-inline-block">
                  <div>See full case study</div>
                  <div className="home_dive-in_link-icon w-embed">{arrowSvg}</div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiveInSection;
