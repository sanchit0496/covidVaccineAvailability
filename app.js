    
    document.getElementById('submit').addEventListener('click', appointment);


    async function appointment(pincode, date){
        
        let pc = document.getElementById('pincode').value;
        let d = document.getElementById('date').value;
   
        fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pc}&date=${d}`)
        .then(response => response.json())
        .then(data => 
        {
            
            if(data.sessions.length == 0){
                document.getElementById('citystate').innerHTML = `No Drives Available Yet! <br><br>
                <button class='reload' onclick = 'location.reload()'>Search Again</button>
                `;
            }else{
                console.log(data);
                document.getElementById('userI').remove();
                document.getElementById('citystate').innerHTML = 
            `There are ${data.sessions.length} Upcoming Covid Vaccination Drives in ${data.sessions[0].district_name}, ${data.sessions[0].state_name}
            <br><br>
            <button class='reload' onclick = 'location.reload()'>New Search</button>
            `;            
            
            let ou = "";
            for(let i = 0 ; i < data.sessions.length; i++){
                ou += `
                <div class = "placeinfo">
                    <strong>Center Name and ID: </strong> ${data.sessions[i].name}, ${data.sessions[i].center_id} <br>
                    <strong>Address: </strong>${data.sessions[i].address} <br>
                    <strong>Slots Available: </strong> ${data.sessions[i].available_capacity} <br>
                    <strong>Minimum Age: </strong>${data.sessions[i].min_age_limit} <br>
                    <strong>Vaccine Available: </strong>${data.sessions[i].vaccine} <br>
                    <strong>Fee: </strong> ₹${data.sessions[i].fee} <br>
                    <br><strong>Slots Available</strong> <br>${data.sessions[i].slots} <br>
                </div>
                `;
            }

            document.getElementById('info').innerHTML = ou;

            }
   
        });
        


    }

