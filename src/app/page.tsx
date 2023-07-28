"use client"
import { useState } from 'react';

export default function Home() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
  
    // Connecting to inputproject API for data inserting into DB
    try {
      const response = await fetch('/api/inputproject', {
        method: "POST",
        body: JSON.stringify({
          title: title,
          description: description
        }),
        headers: {
          'Content-Type': 'application/json',
        }
        
      });

      if (response.ok) {
        // Data inserted successfully
        // You can redirect the user to a success page or display a success message
      } else {
        // Handle error (e.g., display error message to the user)
      }
    } catch (error) {
      // Handle network or server error
    }


  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
        {/* Form fields and input elements */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className=' border border-red-600'
          // ...
        /> <br/><br/>

        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className=' border border-red-600'
          // ...
        /><br/><br/>

        {/* Click button to insert data to vercel postgres DB via "inputProject API" */}
        <button type="submit" className=' bg-red-600 w-20 text-white'>Submit</button><br/><br/>

        <div>Title: {title}</div>
        <div>Description: {description}</div>
      </form>
    </div>
  )
}
