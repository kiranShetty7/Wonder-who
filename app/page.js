"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false)
    setLoading(true);


    try {
      const [ageResponse, genderResponse, countryResponse] = await Promise.all([
        fetch(`https://api.agify.io?name=${name}`).then(res => res.json()),
        fetch(`https://api.genderize.io?name=${name}`).then(res => res.json()),
        fetch(`https://api.nationalize.io?name=${name}`).then(res => res.json())
      ]);

      const ageResponses = [
        <span>Rumor has it you're approximately <span style={{ color: '#ff0000' }}>{ageResponse.age}</span> years old. But time is a construct anyway, right?</span>,
        <span>The oracle predicts you're around <span style={{ color: '#ff0000' }}>{ageResponse.age}</span> years old. Or maybe it's just reading tea leaves again.</span>,
        <span>You've been around the sun approximately <span style={{ color: '#ff0000' }}>{ageResponse.age}</span> times, but who's counting? Certainly not us!</span>
      ];

      const genderResponses = [
        <span>According to cosmic vibrations, your gender appears to be <span style={{ color: '#00ff00' }}>{genderResponse.gender}</span>. But remember, labels are for jars, not people!</span>,
        <span>The cosmic energy suggests your gender might be <span style={{ color: '#00ff00' }}>{genderResponse.gender}</span>. But hey, be yourself, everyone else is already taken!</span>,
        <span>The stars whisper that your gender could be <span style={{ color: '#00ff00' }}>{genderResponse.gender}</span>. Embrace your uniqueness, you're one in a million!</span>
      ];

      const countryResponses = [
        <span>The cosmic map hints that you might hail from <span style={{ color: '#0000ff' }}>{countryResponse.country[0].country_id}</span>. But remember, Earth is just a tiny speck in the universe!</span>,
        <span>According to celestial whispers, your origins might be traced back to <span style={{ color: '#0000ff' }}>{countryResponse.country[0].country_id}</span>. But home is wherever you find love.</span>,
        <span>The intergalactic census speculates that you're from <span style={{ color: '#0000ff' }}>{countryResponse.country[0].country_id}</span>. But remember, the universe is your playground!</span>
      ];

      setAge(ageResponses[Math.floor(Math.random() * ageResponses.length)]);
      setGender(genderResponses[Math.floor(Math.random() * genderResponses.length)]);
      setCountry(countryResponses[Math.floor(Math.random() * countryResponses.length)]);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError("Oops! Something's gone bananas. Try again later.");
      setAge(null);
      setGender(null);
      setCountry(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Wonder-Who 🤔 ?</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={styles.input} placeholder="Enter your name" />
        <button type="submit" className={styles.button}>Guess!</button>
      </form>
      {loading && <p className={styles.loading}>Guessing...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {age && gender && country && !loading && (
        <div className={styles.result}>
          <span>{age}</span>
          <span>{gender}</span>
          <span>{country}</span>
        </div>
      )}
    </main>
  );
}
