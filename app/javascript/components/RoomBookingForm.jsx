const BookRooms = (props) => {
    let bookingData = {
        user_id: 1,
        room_id: null,
        check_in: '',
        check_out: '',
        room_count: 1
    }
   
    return(
      <form>
       <input ref={input => bookingData.room_count = input} placeholder='Enter number of rooms'/>
       <input ref={input => bookingData.check_in = input} placeholder='Enter check in date' />
       <input ref={input => bookingData.check_out = input} placeholder='Enter check out date' />
       <button>Submit</button>
      </form>
    )
  }
