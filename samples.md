# Patient Management
- API to get all patients
    Route: "/patient"
    Method: "GET"

    Sample Response:
    [
        {
            "id": "c53e09aa-051b-4e83-befc-e3945544997b",
            "name": "John",
            "dateOfBirth": "2000-07-05",
            "phoneNumber": "7038258118",
            "email": "abc@xyz.com",
            "createdAt": "2024-01-12T19:32:14.305Z",
            "updatedAt": "2024-01-12T19:32:14.305Z"
        },
        {
            "id": "c53e09aa-123c-4e83-befc-e3asdasdasd",
            "name": "John Too",
            "dateOfBirth": "2000-07-05",
            "phoneNumber": "1234567890",
            "email": "xyz@abc.com",
            "createdAt": "2024-01-12T19:33:14.305Z",
            "updatedAt": "2024-01-12T19:33:14.305Z"
        }
    ]


- API to add a new patient
    - Route: "/patient"
    - Method: "POST"
    
    Sample Request:
        {
            "name": "Also John",
            "dateOfBirth": "2000-06-01",
            "phoneNumber": "0123456789",
            "email": "john@doe.com"
        }

    Sample Response:
        {
            "id": "35eb6273-e2e3-4f00-ac3e-10dd2dcb6118",
            "name": "Also John",
            "dateOfBirth": "2000-06-01",
            "phoneNumber": "0123456789",
            "email": "john@doe.com",
            "createdAt": "2024-01-13T11:14:41.276Z",
            "updatedAt": "2024-01-13T11:14:41.276Z"
        }

- API to GET a Patient Details
    - Route: "/patient/{:patientId}"
    - Method: "GET"

    Sample Response:
        {
            "id": "35eb6273-e2e3-4f00-ac3e-10dd2dcb6118",
            "name": "Also John",
            "dateOfBirth": "2000-06-01",
            "phoneNumber": "0123456789",
            "email": "john@doe.com",
            "createdAt": "2024-01-13T11:14:41.276Z",
            "updatedAt": "2024-01-13T11:14:41.276Z"
        }


- API to Update a Patient
    - Route: "/patient/{:patientId}"
    - Method: "PUT"

    Sample Request:
        {
            "phoneNumber": "1234123412"
        }
    
    Sample Response:
        {
            "id": "35eb6273-e2e3-4f00-ac3e-10dd2dcb6118",
            "dateOfBirth": "2000-06-01",
            "phoneNumber": "1234123412",
            "createdAt": "2024-01-13T11:14:41.276Z",
            "updatedAt": "2024-01-13T11:17:57.590Z"
        }

- API to Delete a Patient Record
    - Route: "/patient/{:patientId}"
    - Method: "DELETE"

    Sample Response
        {
            "raw": [],
            "affected": 1
        }

# Doctor Profiles

- API to add new Doctor
    - Route: "/doctor"
    - Method: "POST"

    Sample Request:
        {
            "name": "Dr. Newton",
            "dateOfBirth": "2000-07-05",
            "phoneNumber": "7038258118",
            "email": "abc@xyz.com",
            "available": false,
            "department": "specific"
        }
    
    Sample Response:
        {
            "id": "75beafb0-ef45-4b1b-afb3-f8d1bca0d2f7",
            "name": "Dr. Newton",
            "department": "specific",
            "phoneNumber": "7038258118",
            "email": "abc@xyz.com",
            "createdAt": "2024-01-13T11:41:16.000Z",
            "updatedAt": "2024-01-13T11:41:16.000Z"
        }

- API to update Doctor Information
    - Route: "/doctor/{:doctorId}"
    - Method: "PUT"

    Sample Request:
        {
            "department": "ophthalmology"
        }

    Sample Response
        {
            "id": "75beafb0-ef45-4b1b-afb3-f8d1bca0d2f7",
            "department": "ophthalmology",
            "createdAt": "2024-01-13T11:41:16.000Z",
            "updatedAt": "2024-01-13T11:43:40.975Z"
        }

- API to Delete Doctor Information
    - Route: "/doctor/{:doctorId}"
    - Method: "DELETE"

    Sample Response:
        {
            "raw": [],
            "affected": 1
        }

# Doctor Appointment

- API to add availability for a doctor
    - Route: "/appointment/add-available-slot"
    - Method: "POST"
    - Query Params: ""

    Sample Request:
        {
            "date": "2024-01-13",
            "slotId": 1,
            "doctorId": "8f9f9f1e-d331-4acc-9c05-e291db1aad62"
        }

Note: Please make sure to add available slots for the doctor before making an appointment request.
In an actual scenario slots will get generated whenever a Doctor marks there attendance in the Clinic

- API to find avaialble time slots for a doctor, considering existing appointments and doctor's availability
    - Route: "appointment/available-slots/{:doctorId}"
    - Method: "GET"
    - Query Param: "forDate: Date"

    Sample Response:
        [
            {
                "id": "10fafc20-e4ba-4597-a9e6-20e394a42dad",
                "date": "2024-01-13",
                "createdAt": "2024-01-14T22:29:52.402Z",
                "updatedAt": "2024-01-14T22:29:52.402Z",
                "slot": {
                    "id": 1,
                    "slug": "first",
                    "displayName": "Morning",
                    "startTime": "09:00:00",
                    "endTime": "11:00:00",
                    "createdAt": "2024-01-13T16:51:54.066Z",
                    "updatedAt": "2024-01-13T16:51:54.066Z"
                }
            },
            {
                "id": "463bd122-dc79-4799-9074-61eef1cf52ac",
                "date": "2024-01-13",
                "createdAt": "2024-01-14T22:32:05.349Z",
                "updatedAt": "2024-01-14T22:32:05.349Z",
                "slot": {
                    "id": 2,
                    "slug": "second",
                    "displayName": "Morning - II",
                    "startTime": "11:00:00",
                    "endTime": "13:00:00",
                    "createdAt": "2024-01-13T16:51:54.066Z",
                    "updatedAt": "2024-01-13T16:51:54.066Z"
                }
            }
        ]

- API to book Appointment for a doctor
    - Route: "/appointment"
    - Method: "POST"
    
    Sample Request:
        {
            "appointmentDate": "2024-01-13",
            "requestedSlot": 1,
            "patientId": "0fd8152e-288b-42f3-9583-e46f64f8a2fb",
            "doctorId": "8f9f9f1e-d331-4acc-9c05-e291db1aad62"
        }

    Sample Response:
        {
            "id": "b2b64489-46ee-4ac1-8956-20351b14963e",
            "appointmentDate": "2024-01-13",
            "patient": {
                "id": "0fd8152e-288b-42f3-9583-e46f64f8a2fb",
                "name": "John",
                "dateOfBirth": "2000-06-01",
                "phoneNumber": "0123456789",
                "email": "john@doe.com",
                "createdAt": "2024-01-13T16:56:11.978Z",
                "updatedAt": "2024-01-13T16:56:11.978Z"
            },
            "doctor": {
                "id": "8f9f9f1e-d331-4acc-9c05-e291db1aad62",
                "name": "Dr. Newton",
                "department": "specific",
                "phoneNumber": "7038258118",
                "email": "abc@xyz.com",
                "createdAt": "2024-01-14T16:53:26.205Z",
                "updatedAt": "2024-01-14T16:53:26.205Z"
            },
            "createdAt": "2024-01-15T14:09:31.538Z",
            "updatedAt": "2024-01-15T14:09:31.538Z",
            "isCanceled": false
        }

- API to list appointments for a specific doctor on a given day.
    - Route: "/appointment/for-doctor/{:doctorId}"
    - Method: "GET"
    - Query Param: "forDate: Date"

    - Sample Response:
        [
            {
                "id": "b2b64489-46ee-4ac1-8956-20351b14963e",
                "appointmentDate": "2024-01-13",
                "isCanceled": false,
                "createdAt": "2024-01-15T14:09:31.538Z",
                "updatedAt": "2024-01-15T14:09:31.538Z"
            }
        ]

- API to update an appointment (change date/time, cancel appointment).
    - Route: "/appointment/{:appointmentId}"
    - Method: "PUT"

    - Sample Request:
        {
            "isCanceled": true
        }
    
    - Sample Response:
        {
            "id": "b2b64489-46ee-4ac1-8956-20351b14963e",
            "isCanceled": true,
            "createdAt": "2024-01-15T14:09:31.538Z",
            "updatedAt": "2024-01-15T14:22:44.953Z",
            "doctor": {
                "id": "8f9f9f1e-d331-4acc-9c05-e291db1aad62",
                "name": "Dr. Newton",
                "department": "specific",
                "phoneNumber": "7038258118",
                "email": "abc@xyz.com",
                "createdAt": "2024-01-14T16:53:26.205Z",
                "updatedAt": "2024-01-14T16:53:26.205Z"
            }
        }
