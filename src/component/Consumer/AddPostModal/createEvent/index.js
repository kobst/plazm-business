import React, {useState} from 'react';
import styled from 'styled-components';
import {unwrapResult} from '@reduxjs/toolkit';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import SaveButton from '../../UI/SaveButton';
import FormBody from './formBody';
import {validate} from './validate';
import ValueLoader from '../../../../utils/loader';
import ButtonGrey from '../../UI/ButtonGrey';
import {addEvent} from '../../../../reducers/eventReducer';
import error from '../../../../constants';
import {addEventToList} from '../../../../reducers/listReducer';
import {FirstRow} from './styled.js';

import EventSchedule from './EventSchedule';
import AddImages from './AddImages';
import SelectedListing from './SelectedListing';
import moment from 'moment';

const bucket = process.env.REACT_APP_BUCKET;

const BottomButtonsBar = styled.div`
	width: 100%;
	color: #fff;
	display: flex;
	justify-content: flex-end;
	textarea {
		min-height: 100px;
		font-weight: 500;
		color: #000;
		margin: 0 0 14px;
	}
	@media (max-width: 991px) and (orientation: landscape) {
		padding: 0 0 15px;
	}
	button {
		@media (max-width: 767px) {
			width: 100%;
			margin: 5px 0;
		}
	}
	@media (max-width: 767px) {
		flex-direction: column;
	}
`;

const PostContent = styled.div`
	width: 100%;
	color: #fff;
`;

const TopBar = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin: 0 0 15px;
`;

const Heading = styled.h1`
	font-style: normal;
	font-weight: bold;
	font-size: 16px;
	line-height: 20px;
	@media (max-width: 767px) {
		font-size: 14px;
		line-height: normal;
	}
`;

const AddYourPostBar = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 0 0 14px;
	border: 1px dashed #ffffff;
	align-items: center;
	position: relative;
	padding: 13px;
	button {
		outline: 0;
		border: none;
		background: transparent;
	}
	@media (max-width: 767px) {
		padding: 7px;
	}
`;

const ErrorDiv = styled.div`
	color: #ff0000;
	font-weight: 600;
	font-size: 11px;
	margin: 0;
	margin-bottom: 10px;
`;

const BottomBtnWrap = styled.div`
	display: flex;
	.MR-15 {
		margin-right: 10px;
	}
	@media (max-width: 767px) {
		flex-direction: column;
	}
`;

const weekDays = {
	'1 Week': 7,
	'2 Week': 14,
	'3 Week': 21,
	'4 Week': 28,
	'5 Week': 35,
};

const days = ['sun', 'mon', 'tue', 'wed', 'thurs', 'fri', 'sat'];

let myInput;
const date = new Date(Math.round(Date.now() / (30 * 60 * 1000)) * (30 * 60 * 1000));
const CreateEventModal = ({
	setDisplayList,
	selectedListForPost,
	setSelectedListForPost,
	closeModal,
	setDisplayCalendar,
	eventDetails,
	setEventDetails,
	eventTitle,
	setEventTitle,
	eventDescription,
	setEventDescription,
	setImageUpload,
	imageUpload,
	setImageUrl,
	setImageCopy,
	imageFile,
	setImageFile,
	mentionArrayList,
	setMentionArrayList,
	mentionArrayUser,
	setMentionArrayUser,
}) => {
	const [loader, setLoader] = useState(false);
	const [imageError, setImageError] = useState('');
	const [formError, setError] = useState('');
	const [listError, setListError] = useState('');
	const [response, setResponse] = useState('');
	const user = useSelector((state) => state.user.user);
	const business = useSelector((state) => state.business.business);
	const ws = useSelector((state) => state.user.ws);
	const dispatch = useDispatch();
	const eventDate = useSelector((state) => state.event.date);

	const [selectedDate, handleDateChange] = useState('2018-01-01T00:00:00.000Z');
	/*
	 * @desc: to delete an image
	 * @params: image id
	 */
	const deleteImage = (v) => {
		setImageUpload(null);
	};

	const clearImages = () => {
		setImageUpload(null);
	};

	/*
  @desc: to get specific folder name to be created in aws
  @params: consumer name, consumer _id
  */
	const getFolderName = (name, id) => {
		/* to remove all special characters except space */
		const removeSpecialCharacter = name.replace(/[^a-zA-Z ]/g, '');
		/* to replace all spaces to underscore */
		const replacedName = removeSpecialCharacter.split(' ').join('_');
		/* return folder name */
		return replacedName + '_' + id;
	};

	/*
	 * @desc: to change file_name
	 */
	const getFileName = (name) => {
		return `${Date.now()}-${name}`;
	};

	/*
  @desc: to check input file format and throw error if invalid image is input
  @params: input file
  */

	const uploadImage = async (imageFile) => {
		// const selectedFile = e.target.files[0];
		// if (selectedFile) {
		//   const idxDot = selectedFile.name.lastIndexOf(".") + 1;
		//   const extFile = selectedFile.name
		//     .substr(idxDot, selectedFile.name.length)
		//     .toLowerCase();
		//   // console.log(selectedFile, extFile);
		//   if (extFile === "jpeg" || extFile === "png" || extFile === "jpg") {
		//     setImageError("");
		//     setImageUpload(URL.createObjectURL(e.target.files[0]));
		//     setImageFile(selectedFile);
		//   } else {
		//     setImageError("Only jpg/jpeg and png,files are allowed!");
		//   }
		// }
		if (imageFile !== null) {
			const folder_name = folderName(user.name, user._id);
			const file_name = fileName(imageFile.name);
			const baseUrl = `https://${bucket}.s3.amazonaws.com/UserProfiles/${folder_name}/profiles/${file_name}`;
			const value = await fetch(
				`${process.env.REACT_APP_API_URL}/api/upload_photo`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						Key: file_name,
						ContentType: imageFile.type,
						folder_name: folder_name,
					}),
				}
			);
			const body = await value.text();
			const Val = JSON.parse(body);

			return fetch(Val, {
				method: 'PUT',
				headers: {
					'Content-Type': imageFile.type,
				},
				body: imageFile,
			})
				.then(() => {
					return baseUrl;
				})
				.catch((error) => {
					console.log(error); // Handle the error response object
					return;
				});
		}
	};

	/*
  @desc: add a event
  @params: form values
  */
	const saveEvent = async (values) => {
		// start_time: date.getHours() + ':' + date.getMinutes(),
		// end_time: date.getHours() + ':' + (parseInt(date.getMinutes())+15),
		const start_time = moment(values.date).minutes(parseInt(values.start_time?.split(':')[1]));
		start_time.hours(parseInt(values.start_time?.split(':')[0]));
		const end_time = moment(values.date).minutes(parseInt(values.end_time?.split(':')[1]));
		end_time.hours(parseInt(values.end_time?.split(':')[0]));
		if (values.repeat != 8) {
			end_time.add(weekDays[values.for], 'days');
		}
		if (start_time < moment()) {
			setDateError(error.START_DATE_GREATER_THAN_CURRENT);
			return;
		}
		if (start_time > end_time) {
			setDateError(error.START_DATE_ERROR);
			return;
		}
		setLoader(true);
		const imagePromises = values.images.map((img) => uploadImage(img));
		let images = [];
		try {
			images = await Promise.all(imagePromises);
		} catch (error) {
			console.log(error);
		}

		/** if event details are not added */
		// if (eventDetails !== null) {
		// if (!selectedListForPost) {
		//   setListError(error.EVENT_LIST_ERROR);
		// } else {
		setListError('');
		/*set loader value */
		/* to upload file to s3 bucket */
		let imageUrl = null;

		var localFormat = 'YYYY-MM-DD[T]HH:mm:ss';
		const s_t = start_time.format('HH:mm:ss');
		const s_d = start_time.format('YYYY-MM-DD');
		const e_t = end_time.format('HH:mm:ss');
		const e_d = end_time.format('YYYY-MM-DD');

		const obj = {
			user: user._id,
			business: business[0]._id,
			title: values.title,
			description: values.description,
			taggedUsers: mentionArrayUser,
			taggedLists: mentionArrayList,
			eventSchedule: {
				start_time: moment(s_t + ' ' + s_d).format(),
				end_time: moment(e_t + ' ' + e_d).format(),
			},
			recurring: values.repeat,
			listId: values.lists[0],
			media: images,
		};

		/** add event */
		const resultAction = await dispatch(addEvent({obj: obj, user: user}));
		const response = await unwrapResult(resultAction);
		if (response.data.success === true) {
			/** if any list is selected than add event to list */
			if (values.lists) {
				const listPromises = values.lists.map((list) => {
					return dispatch(
						addEventToList({
							eventId: response.data
								.event
								._id,
							listId: list,
						})
					);
				});
				const addToList = await Promise.all(listPromises);
				const res = await unwrapResult(addToList[0]);
				if (res.data.addEventToList.success === true) {
					closeModal(true);
					setLoader(false);
					setEventDescription('');
					setEventTitle('');
					setImageUrl(null);
					setImageCopy([]);
					setImageUpload(null);
				}
			} else {
				closeModal();
				setLoader(false);
				setEventDescription('');
				setEventTitle('');
				setImageUrl(null);
				setImageCopy([]);
				setImageUpload(null);
			}
			console.log('here');
			ws.send(
				JSON.stringify({
					action: 'event',
					event: {
						...response.event,
						type: 'addEvent',
						user: user,
						totalComments: 0,
						likes: [],
						createdAt: new Date(Date.now()),
					},
				})
			);
		}
	};

	/** cancel button functionality */
	const cancelButton = (e) => {
		e.preventDefault();
		closeModal();
	};

	/** add to a list button functionality */
	const listDisplay = (e) => {
		e.preventDefault();
		setDisplayList(true);
	};

	/** to display calendar component */
	const displayCalendar = (e) => {
		e.preventDefault();
		setDisplayCalendar(true);
	};

	return (
		<PostContent>
			<TopBar>
				<Heading>Create Event</Heading>
			</TopBar>
			<Formik
				// enableReinitialize={true}
				initialValues={{
					title: eventTitle,
					description: eventDescription,
					repeat: [8],
					date: new Date(Date.now()),
					start_time:
						date.getHours() +
						':' +
						date.getMinutes(),
					end_time:
						date.getHours() +
						':' +
						(parseInt(date.getMinutes()) + 15),
					images: [],
					lists: [],
					for: '1 Week',
				}}
				/* validation schema */
				validationSchema={Yup.object(validate)}
				validateOnChange={false}
				validateOnBlur={false}
				onSubmit={(values) => {
					/*update profile function call*/
					setDateError(null);
					saveEvent(values);
				}}
			>
				{(formik) => (
					<form
						onSubmit={formik.handleSubmit}
						method="POST"
					>
						<FormBody
							loader={loader}
							formik={formik}
							setResponse={
								setResponse
							}
							setEventTitle={
								setEventTitle
							}
							setEventDescription={
								setEventDescription
							}
							mentionArrayList={
								mentionArrayList
							}
							setMentionArrayList={
								setMentionArrayList
							}
							mentionArrayUser={
								mentionArrayUser
							}
							setMentionArrayUser={
								setMentionArrayUser
							}
						/>

						{listError !== '' ? (
							<ErrorDiv>
								{
									listError
								}
							</ErrorDiv>
						) : null}

						{imageError !== '' ? (
							<ErrorDiv>
								{
									imageError
								}
							</ErrorDiv>
						) : null}

						{response !== '' ? (
							<ErrorDiv>
								{
									response
								}
							</ErrorDiv>
						) : (
							<></>
						)}

						<EventSchedule
							formik={formik}
							setEventDetails={() =>
								null
							}
						/>
						{dateError ? (
							<FirstRow>
								<ErrorDiv>
									{
										dateError
									}
								</ErrorDiv>
							</FirstRow>
						) : null}
						<AddImages formik={formik} />
						<SelectedListing formik={formik} />

						{/* bottom buttons bar */}
						<BottomButtonsBar>
							<BottomBtnWrap>
								<ButtonGrey
									className="MR-15"
									onClick={(
										e
									) =>
										cancelButton(
											e
										)
									}
									disabled={
										loader
									}
								>
									Cancel
								</ButtonGrey>
								{loader && (
									<div
										style={{
											marginTop: '3px',
										}}
									>
										<ValueLoader />
									</div>
								)}
								{!loader && (
									<SaveButton
										type="submit"
										disabled={
											loader
										}
									>
										Create
									</SaveButton>
								)}
							</BottomBtnWrap>
						</BottomButtonsBar>
					</form>
				)}
			</Formik>
		</PostContent>
	);
};

export default CreateEventModal;
