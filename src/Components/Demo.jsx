import React, { useState } from 'react';
import './seating.css';
import screenimg from '../Images/screen.png';

function Seating() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      // Remove the seat if it's already selected
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else if (selectedSeats.length < 3) {
      // Add the seat if less than three are selected
      setSelectedSeats([...selectedSeats, seat]);
    } else {
      // Replace the first selected seat if three seats are already selected
      setSelectedSeats([...selectedSeats.slice(1), seat]);
    }
  };

  const isSeatSelected = (seat) => selectedSeats.includes(seat);
  console.log(selectedSeats);

  return (
    <>
      <style type='text/css'>
        {`
          .seating li.active {
            background-color: #6bd4ac;
            color: white;
          }
        `}
      </style>
      <div className='text-center mt-5 d-grid'>
        <img src={screenimg} width={'70%'} alt="Screen" />
        <small>All eyes this way please!</small>
      </div>
      <div className='mt-5 fs-5'><strong>₹200</strong> SCREEN-5</div>
      <div className="seatingOfTheatre text-center mx-auto">
        {['A', 'B', 'C', 'D', 'E', 'F'].map(row => (
          <div key={row} className='seating my-2'>
            <span>{row}</span>
            {[...Array(10).keys()].map(i => {
              const seat = `${row}${i + 1}`;
              return (
                <li
                  key={seat}
                  value={seat}
                  className={`border border-light ${isSeatSelected(seat) ? 'active' : ''}`}
                  onClick={() => handleSeatClick(seat)}
                >
                  {i + 1}
                </li>
              );
            })}
            <span id='seatEndSpan'>{row}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default Seating;
