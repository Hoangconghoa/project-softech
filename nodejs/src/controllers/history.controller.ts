import { Request, Response, NextFunction } from "express";
import historysService from "../services/history.sercice";
import { sendJsonSuccess } from "../helpers/responseHandler";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await historysService.getAll(req.query);
    //console.log('result',result);
    //res.status(200).json(result)
    sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};

const gethistoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params; //return id = string

    const history = await historysService.getHistoryById(id);
    //res.status(200).json(history)
    sendJsonSuccess(res)(history);
  } catch (err) {
    next(err);
  }
};

const createhistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;

    const history = await historysService.createHistory(data);

    // res.status(201).json({
    //     message: `Create history`,
    //     history: history
    // })
    sendJsonSuccess(res, "Create history successfully", 201)(history);
  } catch (err) {
    next(err);
  }
};

const updatehistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const history = await historysService.updateHistory(id, data);

    // res.status(200).json({
    //     message: `Update history by ID ${id}`,
    //     history: history
    // })
    sendJsonSuccess(res)(history);
  } catch (err) {
    next(err);
  }
};

const deletehistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const history = await historysService.deleteHistory(id);
    // res.status(200).json({
    //     message: `Delete history by ID ${id}`,
    //     history: history
    // })
    sendJsonSuccess(res)(history);
  } catch (err) {
    next(err);
  }
};

export default {
  getAll,

  gethistoryById,

  createhistory,
  updatehistory,
  deletehistory,
};
