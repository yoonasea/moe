import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HeroSection from "../HeroSection";
import { createHero } from "@/test/factories";

describe("HeroSection", () => {
  it("renders title and subtitle", () => {
    const hero = createHero();
    render(<HeroSection hero={hero} />);

    expect(screen.getByText(hero.title)).toBeInTheDocument();
    expect(screen.getByText(hero.subtitle)).toBeInTheDocument();
  });

  it("renders CTA link with correct href", () => {
    const hero = createHero({ ctaText: "Click Here", ctaLink: "/test" });
    render(<HeroSection hero={hero} />);

    const cta = screen.getByText("Click Here");
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "/test");
  });

  it("sets background image as style", () => {
    const hero = createHero({ backgroundImage: "/images/bg.jpg" });
    render(<HeroSection hero={hero} />);

    const section = screen.getByLabelText("Hero banner");
    expect(section).toHaveStyle(`background-image: url(/images/bg.jpg)`);
  });

  it("has accessible label", () => {
    const hero = createHero();
    render(<HeroSection hero={hero} />);

    expect(screen.getByLabelText("Hero banner")).toBeInTheDocument();
  });
});
