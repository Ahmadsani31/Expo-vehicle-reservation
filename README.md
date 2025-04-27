# 🚗 Vehicle Reservation App

A **smart vehicle reservation app** built with **React Native + Expo**.  
Users can easily **reserve vehicles** by **scanning a QR code** attached to each vehicle, and **track usage locations** using **real-time GPS logging**.  
Designed for efficient fleet management and seamless vehicle operations.

---

## ✨ Features

- 📷 **QR Code Scanning**:  
  Instantly scan a vehicle's QR code to start a reservation.

- 📍 **GPS Location Tracking**:  
  Automatically log the vehicle's location during the usage period.

- 📅 **Reservation System**:  
  Book and manage vehicle reservations quickly and securely.

- 🔒 **Secure Authentication**:  
  Ensure that only authorized users can reserve and operate vehicles.

- 🔔 **Real-Time Notifications**:  
  Get alerts for reservation status, usage time limits, and location updates.

---

## 🚀 Tech Stack

- **React Native** (with TypeScript)
- **Expo** (for QR scanning, camera access, and location services)
- **Expo Camera** — QR Code scanning
- **Expo Location** — GPS tracking
- **React Context API** (for state management)
- **React Navigation** — App routing
- **Expo Router** — (optional) file-based navigation

---

## 📷 QR Code Reservation Flow

1. Open the app and tap **"Scan Vehicle QR"**.
2. Scan the QR code attached to the vehicle.
3. Automatically fetch the vehicle info.
4. Confirm and **start reservation**.
5. GPS tracking will log your location during the usage.

---

## 📍 GPS Location Logging

- Location is captured automatically during reservation period.
- Stored securely for historical usage records and tracking.
- Useful for monitoring fleet usage and route optimization.

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/Ahmadsani31/expo-vehicle-reservasi.git

# Navigate into the project directory
cd vehicle-reservation-app

# Install dependencies
npm install

# Start the Expo development server
npm start
