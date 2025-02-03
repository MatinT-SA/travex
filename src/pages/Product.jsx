import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />

      <section>
        <img
          className={styles.image}
          src="images/img-1.jpg"
          alt="lonely person glaring at the mountain and ocean"
        />
        <div>
          <h2>Explore with Travex</h2>
          <p>
            With Travex, selecting the places you’ve been has never been easier
            or more visually stunning. The interactive map allows you to simply
            click on any location you’ve traveled to, and watch your journey
            unfold in a sleek, modern interface.
          </p>
          <p>
            All your destinations are neatly organized by country and city,
            making it a breeze to navigate through your travels. Click on any
            city to dive deeper into your experiences, where you’ll find travel
            dates, personal notes, and more details about your adventures.
          </p>
        </div>
      </section>
    </main>
  );
}
