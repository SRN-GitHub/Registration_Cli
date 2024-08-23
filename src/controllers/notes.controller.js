import HttpStatus from 'http-status-codes';
import { newNotes, getAllNote,forgotPassword as forgotPasswordServices , getArchivedNotes as getArchivedNotesOk, getTrashedNotes as getTrashedNotesOk , updateNote as updateNoteService, deleteNote as deleteNoteService } from '../services/notes.service';

// ^    CREATE NOTES >>>
export const createNote = async (req, res, next) => {
    try {
        const note = await newNotes(req.body);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: note,
            message: 'Note Matched... Fetched successfully'
        });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        });
    }
};

// &    GET ALL NOTES >>>
export const getAllNotes = async (req, res, next) => {
    try {
        const notes = await getAllNote(req.body.createdBy);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: notes,
            message: 'All Notes Fetched successfully'
        });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        });
    }
};

// *    UPDATE NOTE >>>
export const updateNote = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedNote = await updateNoteService(id, req.body);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: updatedNote,
            message: 'Note updated successfully'
        });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        });
    }
};

// !    DELETE NOTE >>>
export const deleteNote = async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteNoteService(id);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            message: 'Note deleted successfully'
        });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        });
    }
};

// &    ARCHIEVE NOTES >>>
export const getArchivedNotes = async (req, res, next) => {
    try {
        const notes = await getArchivedNotesOk();
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: notes,
            message: 'Archived notes Fetched successfully'
        });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        });
    }
};

// &    TRASH NOTES >>>
export const getTrashedNotes = async (req, res, next) => {
    try {
        const notes = await getTrashedNotesOk();
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: notes,
            message: 'Trashed notes Fetched successfully'
        });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message
        });
    }
};
 