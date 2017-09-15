This Project is part of Summer Internship at Slater Technologies Inc.
It is Raspbian based project OS for Raspberry Pi.
It was made to help to solve the problem with Students, by avoiding the queues for Escort services, which usually takes lots of time.
The Project contains three parts,
1) Raspberry Pi
NodeJs server will be running in Raspberry Pi (Raspberry Pi folder)
2) Local machine
Which takes the user details get more information from AWS database, and send it to Server running in Raspberry Pi
3) Twilio
Once the details is received from Local machine, sms is sent to first 5 students in a queue, to come for the Escort services.
