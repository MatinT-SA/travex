import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />

      <section>
        <div>
          <h2>Affordable Plans for Every Traveler</h2>
          <p>
            Choose the plan that fits your journey and unlock the full potential
            of Travex to track every destination you've explored on the map.
          </p>
        </div>
        <img
          className={styles.image}
          src="images/img-2.jpg"
          alt="Calculator on a piece of paper with circled word competitive pricing"
        />
      </section>
    </main>
  );
}
