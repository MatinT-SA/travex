import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />

      <section>
        <img
          src="images/img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
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
