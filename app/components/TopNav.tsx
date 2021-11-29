/** jsx React.createElement */
import { React } from "../deps.ts";
import { Link } from "./Link.tsx";

export const TopNav = () => {
  return (
    <div /* className={styles.topNavContainer} */>
      <h1>Michael of the Busbies</h1>
      <div /* className={styles.topNav} */>
        <Link href="/">
          Blog
        </Link>
        <Link href="/resume">
          Resume/CV
        </Link>
        <Link href="/about">
          About
        </Link>
      </div>
    </div>
  );
};
