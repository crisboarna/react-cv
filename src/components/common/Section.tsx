import { FC, ReactNode } from "react";

export type SectionProps = {
  readonly id?: string;
  className?: string;
  icon?: string;
  title?: string;
  children?: ReactNode;
};

const Section: FC<SectionProps> = ({
  className,
  id,
  title,
  icon,
  children,
}) => (
  <section className={`section ${className || ""}`} id={id}>
    <header>
      <h2 className="section-title" data-testid={"section/header-title"}>
        <i
          className={`fa fa-${icon || "user"}`}
          data-testid={"section/header-icon"}
        />
        {title}
      </h2>
    </header>
    {children}
  </section>
);

export default Section;
