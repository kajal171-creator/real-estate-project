import asyncHandler from 'express-async-handler';
import { prisma } from "../config/prismaConfig.js";

export const createUser = asyncHandler(async (req, res) => {
    console.log("Creating a User");

    let { email } = req.body;
    const userExists = await prisma.user.findUnique({ where: { email: email } });
    if (!userExists) {
        const user = await prisma.user.create({ data: req.body });
        res.send({
            message: "User registered successfully",
            user: user,
        });
    } else {
        res.status(201).json({
            message: "User already registered"
        });
    }
});

// Function to book a visit to resd
export const bookVisit = asyncHandler(async (req, res) => {
    const { email, date } = req.body;
    const { id } = req.params;
    try {
        const alreadyBooked = await prisma.user.findUnique({
            where: { email },
            select: { bookVisits: true }
        });
        if (alreadyBooked.bookVisits.some((visit) => visit.id === id)) {
            res.status(400).json({
                message: "This residency is already booked by you"
            });
        } else {
            const updatedBookVisits = [...alreadyBooked.bookVisits, { id, date }];
            await prisma.user.update({
                where: { email: email },
                data: { bookVisits: updatedBookVisits }
            });
            res.send("Your visit is booked successfully");
        }
    } catch (err) {
        throw new Error(err.message);
    }
});

// Function to get all bookings
export const getAllBooking = asyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
        const bookings = await prisma.user.findUnique({
            where: { email },
            select: { bookVisits: true }
        });
        res.status(200).send(bookings);
    } catch (err) {
        throw new Error(err.message);
    }
});

// Function to cancel a booking
export const cancelBooking = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
            select: { bookVisits: true }
        });
        const index = user.bookVisits.findIndex((visit) => visit.id === id);
        if (index === -1) {
            res.status(404).json({
                message: "Booking not found"
            });
        } else {
            user.bookVisits.splice(index, 1);
            await prisma.user.update({
                where: { email },
                data: {
                    bookVisits: user.bookVisits
                }
            });
            res.send("Booking cancelled successfully");
        }
    } catch (err) {
        throw new Error(err.message);
    }
});

// Function to add/remove a resd in favourite list of user
export const toFab = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const { rid } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { email: email }
        });
        if (user.fabResidenciesID.includes(rid)) {
            const updatedUser = await prisma.user.update({
                where: { email },
                data: {
                    fabResidenciesID: {
                        set: user.fabResidenciesID.filter((id) => id !== rid)
                    }
                }
            });
            res.send({ message: "Removed from favourite", user: updatedUser });
        } else {
            const updatedUser = await prisma.user.update({
                where: { email },
                data: {
                    fabResidenciesID: {
                        push: rid
                    }
                }
            });
            res.send({ message: "Added in favourite", user: updatedUser });
        }
    } catch (err) {
        throw new Error(err.message);
    }
});

// Function to get all favourites
export const getAllFavourites = asyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
        const favResd = await prisma.user.findUnique({
            where: { email },
            select: { fabResidenciesID: true }
        });
        res.status(200).send(favResd);
    } catch (err) {
        throw new Error(err.message);
    }
});
