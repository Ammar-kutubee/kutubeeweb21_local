import axios from 'axios';
// import { getFcmToken } from "./functions";

export const getBookData = async (bookId, userId) => {
	var promise = new Promise((resolve, reject) => {
		const formData = new FormData();

		formData.append('id', bookId);
		formData.append('uid', userId);

		axios.post('https://school.kutubee.com:4000/book/app/get', formData).then((res) => {
			resolve(res.data[0]);
		});
	});
	return promise;
};

export const getBookProgress = async (uid, bookId) => {
	var promise = new Promise((resolve, reject) => {
		const formData = new FormData();

		formData.append('uid', uid);
		formData.append('book_id', bookId);
		axios.post('https://school.kutubee.com:4000/book/user/complete', formData).then((res) => {
			console.log('yyyyyy', res.data, formData);
			resolve(res.data);
		});
	});
	return promise;
};
export const getUpdateUserDataCode = async (code, dispatch) => {
	var promise = new Promise((resolve, reject) => {
		const formData = new FormData();
		formData.append('code', code);

		let apiLink = 'https://school.kutubee.com:4000/app/code/login';

		// if(window.location.hostname === "localhost") {
		//     apiLink = "http://localhost:4000/app/code/login";
		// }

		axios.post(apiLink, formData).then((res) => {
			if (res.data.message == 'success') {
				if (res.data.expired) {
					localStorage.removeItem('userLoggedIn');
					localStorage.removeItem('userLoggedData');
					resolve('expired');
				} else {
					let userType = res.data.user.type;

					let userId = res.data.user._id;
					if (userType == 'teacher' || userType == 'student') {
						localStorage.setItem('userLoggedIn', 'true');
						localStorage.setItem(
							'userLoggedData',
							JSON.stringify({
								userData: res.data.user,
								userLevel: res.data.level,
								nextLevel: res.data.nextLevel,
								userLevelEn: res.data.levelEn,
								nextLevelEn: res.data.nextLevelEn,
								userLevelFr: res.data.levelFr,
								nextLevelFr: res.data.nextLevelFr,
							})
						);

						// if (res.data.user.avatarlink != undefined) {
						//   res.data.user.avatarlink = res.data.user.avatarlink + '?c=' + new Date().getTime()
						// }
						var message = {
							userData: {
								userData: res.data.user,
								userLevel: res.data.level,
								nextLevel: res.data.nextLevel,
								userLevelEn: res.data.levelEn,
								nextLevelEn: res.data.nextLevelEn,
								userLevelFr: res.data.levelFr,
								nextLevelFr: res.data.nextLevelFr,
							},
						};
						dispatch({ type: 'SAVE_LOGGEDIN_USER', message });

						resolve({
							type: res.data.user.type,
							status: 'verified',
							userData: res.data.user,
						});
					} else {
						// if (res.data.user.avatarlink != undefined) {
						//   res.data.user.avatarlink = res.data.user.avatarlink + '?c=' + new Date().getTime()
						// }
						let subAccounts = res.data.subAccounts.map((account) => {
							return {
								userData: account.user,
								userLevel: account.level,
								nextLevel: account.nextLevel,
								userLevelEn: account.levelEn,
								nextLevelEn: account.nextLevelEn,
								userLevelFr: account.levelFr,
								nextLevelFr: res.nextLevelFr,
							};
						});
						let findAccount = subAccounts.find((user) => {
							return user.userData._id == userId;
						});
						if (findAccount == undefined) {
							findAccount = {
								userData: res.data.user,
								userLevel: res.data.level,
								nextLevel: res.data.nextLevel,
							};
							// if (findAccount.userData.avatarData != undefined) {
							//     let userAvatarData = {
							//         userAvatarData: findAccount.userData.avatarData,
							//         gender: findAccount.userData.gender
							//     }
							//     dispatch({ type: "LOAD_USER_AVATAR_DATA", userAvatarData });
							// }
						} else {
							// if (res.data.user.avatarData != undefined) {
							//     let userAvatarData = {
							//         userAvatarData: res.data.user.avatarData,
							//         gender: res.data.user.gender
							//     }
							//     dispatch({ type: "LOAD_USER_AVATAR_DATA", userAvatarData });
							// }
						}
						localStorage.setItem(
							'userLoggedData',
							JSON.stringify({
								userData: findAccount.userData,
								userLevel: findAccount.userLevel,
								nextLevel: findAccount.nextLevel,
								userLevelEn: findAccount.levelEn,
								nextLevelEn: findAccount.nextLevelEn,
								userLevelFr: findAccount.levelFr,
								nextLevelFr: findAccount.nextLevelFr,
							})
						);
						localStorage.setItem(
							'userSubAccounts',
							JSON.stringify({
								subAccounts: subAccounts,
								mainAccount: {
									userData: res.data.user,
									userLevel: res.data.level,
									nextLevel: res.data.nextLevel,
									userLevelEn: res.data.levelEn,
									nextLevelEn: res.data.nextLevelEn,
									userLevelFr: res.data.levelFr,
									nextLevelFr: res.data.nextLevelFr,
								},
							})
						);
						message = {
							userData: {
								userData: findAccount.userData,
								userLevel: findAccount.userLevel,
								nextLevel: findAccount.nextLevel,
								userLevelEn: findAccount.levelEn,
								nextLevelEn: findAccount.nextLevelEn,
								userLevelFr: findAccount.levelFr,
								nextLevelFr: findAccount.nextLevelFr,
							},
						};
						dispatch({ type: 'SAVE_LOGGEDIN_USER', message });

						resolve({
							type: res.data.user.type,
							status: 'verified',
							userData: res.data.user,
						});
					}
				}
			} else {
				resolve('not-verified');
			}
		});
	});

	return promise;
};
export const getBookUserRate = async (bookId, uid) => {
	var promise = new Promise((resolve, reject) => {
		const formData = new FormData();
		formData.append('bid', bookId);
		formData.append('uid', uid);
		axios.post('https://school.kutubee.com:4000/rate/get_user_book', formData).then((res) => {
			console.log('user raaaaaate', res.data);
			resolve(res.data);
		});
	});

	return promise;
};

export const getBookRatings = async (bookId, showAll) => {
	var promise = new Promise((resolve, reject) => {
		const formData = new FormData();

		formData.append('book_id', bookId);
		formData.append('showAll', showAll);
		axios.post('https://school.kutubee.com:4000/book/rates/v3/list', formData).then((res) => {
			// console.log('ratings', res.data)
			resolve(res.data);
		});
	});

	return promise;
};

export const getQuizData = async (bookId) => {
	var promise = new Promise((resolve, reject) => {
		const formData = new FormData();
		formData.append('bookId', bookId);
		// formData.append('bookId', 'book_1');

		axios.post('https://school.kutubee.com:4000/book/app/quiz/v3/getdata', formData).then((res) => {
			resolve(res.data[0]);
			// console.log('\\\check quizData', res);
		});
	});

	return promise;
};

export const sendForgetPasswordEmail = async (email) => {
	var promise = new Promise((resolve, reject) => {
		const formData = new FormData();
		formData.append('email', email);
		axios.post('https://school.kutubee.com:4000/reset/password', formData).then((res) => {
			resolve(res.data.message);
			console.log('res', res.data.message);
		});
	});

	return promise;
};

export const getUserFav = async (uid, language, showAll) => {
	var promise = new Promise((resolve, reject) => {
		console.log('ssssssss');
		const formData = new FormData();
		formData.append('uid', uid);
		formData.append('language', language);
		formData.append('showAll', showAll);
		axios.post('https://school.kutubee.com:4000/openlibrary/userfav', formData).then((res) => {
			resolve(res.data);
		});
	});

	return promise;
};

export const getFiltersBooks = async (uid, filters, language, page) => {
	let levelIds = filters.selectedLevels.map((level) => {
		return level._id;
	});
	let subjectIds = filters.selectedSubjects.map((level) => {
		return level._id;
	});
	let pypIds = filters.selectedPyp.map((cat) => {
		return cat._id;
	});
	let genre;
	// if (filters.selectedGenre == 0) {
	//     genre = 'all'
	// } else if (filters.selectedGenre == 1) {
	//     genre = 'fiction'
	// } else if (filters.selectedGenre == 2) {
	//     genre = 'non-fiction'
	// }

	var promise = new Promise((resolve, reject) => {
		const formData = new FormData();
		formData.append('uid', uid);
		formData.append('subjectIds', JSON.stringify(subjectIds));
		formData.append('levelIds', JSON.stringify(levelIds));
		formData.append('pypIds', JSON.stringify(pypIds));
		formData.append('genre', filters.selectedGenre);
		formData.append('resources', JSON.stringify(filters.selectedResources));

		formData.append('language', language);
		formData.append('page', page);
		axios.post('https://school.kutubee.com:4000/filter/level/booksearch', formData).then((res) => {
			console.log('page', page);
			resolve(res.data);
		});
	});

	return promise;
};

export const getCategories = async (uid, language) => {
	var promise = new Promise((resolve, reject) => {
		console.log('ssssssss');
		const formData = new FormData();
		formData.append('uid', uid);
		formData.append('language', language);
		axios.post('https://school.kutubee.com:4000/openlibrary/categories', formData).then((res) => {
			console.log('getCategories', res.data);
			resolve(res.data);
		});
	});

	return promise;
};

export const getContinueReading = async (uid, language, showAll) => {
	var promise = new Promise((resolve, reject) => {
		console.log('ssssssss');
		const formData = new FormData();
		formData.append('uid', uid);
		formData.append('language', language);
		formData.append('showAll', showAll);
		axios.post('https://school.kutubee.com:4000/openlibrary/user/continue_reading', formData).then((res) => {
			// console.log('ahmaaaaaaaaaaaaaaaaaaaaaaaaaaaaaad', res.data, formData)
			resolve(res.data);
		});
	});

	return promise;
};

export const getActiveAssignments = async (uid) => {
	var promise = new Promise((resolve, reject) => {
		console.log('ssssssss');
		const formData = new FormData();
		formData.append('uid', uid);
		axios.post('https://school.kutubee.com:4000/assignment/userdata', formData).then((res) => {
			console.log('assignments', res.data);
			resolve(res.data);
		});
	});

	return promise;
};

export const getUserLevelBooks = async (uid, language) => {
	var promise = new Promise((resolve, reject) => {
		console.log('ssssssss');
		const formData = new FormData();
		formData.append('uid', uid);
		formData.append('language', language);
		axios.post('https://school.kutubee.com:4000/openlibrary/user/v2/get_level_book', formData).then((res) => {
			// console.log('levelbookssssss', res.data, formData)
			resolve(res.data);
		});
	});

	return promise;
};

export const getUserLevelData = async (uid, language) => {
	var promise = new Promise((resolve, reject) => {
		const formData = new FormData();
		formData.append('uid', uid);
		formData.append('language', language);
		axios.post('https://school.kutubee.com:4000/openlibrary/get_next_level', formData).then((res) => {
			// console.log('levelbookssssss', res.data, formData)
			resolve(res.data);
		});
	});

	return promise;
};

export const getUserData = async (uid) => {
	var promise = new Promise((resolve, reject) => {
		const formData = new FormData();
		formData.append('uid', uid);
		axios.post('https://school.kutubee.com:4000/openlibrary/userdata/get', formData).then((res) => {
			// console.log('userData',res.data,formData)
			resolve(res.data);
		});
	});

	return promise;
};

export const getCategoriesBooks = async (uid, cid) => {
	var promise = new Promise((resolve, reject) => {
		console.log('ssssssss');
		const formData = new FormData();
		formData.append('uid', uid);
		formData.append('cat_id', cid);
		console.log('userData', formData);
		axios.post('https://school.kutubee.com:4000/book/app/v3/list', formData).then((res) => {
			// console.log('userData',res.data,formData)
			resolve(res.data);
		});
	});

	return promise;
};

export const getAssignmentData = async (uid, assignmentId) => {
	var promise = new Promise((resolve, reject) => {
		console.log('ssssssss');
		const formData = new FormData();
		formData.append('uid', uid);
		formData.append('assignmentId', assignmentId);
		axios.post('https://school.kutubee.com:4000/book/assignment/v3/get', formData).then((res) => {
			resolve(res.data);
		});
	});

	return promise;
};

export const getFavBooksIds = async (uid, dispatch) => {
	var promise = new Promise((resolve, reject) => {
		const formData = new FormData();
		formData.append('uid', uid);
		console.log('ahmaaaaaaaaaaaaaaaaaaad', formData);
		axios.post('https://school.kutubee.com:4000/openlibrary/userfav/getIds', formData).then((res) => {
			let favBooks = {
				favBooks: res.data,
			};
			dispatch({ type: 'GET_FAV_BOOKS', favBooks });
			resolve('done');
		});
	});

	return promise;
};
export const toggleFavorite = async (uid, bookId, bookIsFav, dispatch) => {
	var promise = new Promise((resolve, reject) => {
		console.log('bookIsFav', bookIsFav);
		const formData = new FormData();
		if (bookIsFav) {
			var action = 'delete';
			formData.append('action', action);
		} else {
			var action = 'add';
			formData.append('action', action);
		}
		formData.append('user_id', uid);
		formData.append('book_id', bookId);
		console.log('toggle Faaaaav', formData);
		axios.post('https://school.kutubee.com:4000/user/uploadFav', formData).then((res) => {
			if (res.data.message == 'done') {
				console.log('faaaaav', res.data);
				dispatch({ type: 'POINTS_EARNED', message: { pointIncrease: res.data.pointIncrease } });
				getFavBooksIds(uid, dispatch);
				resolve('done');
			}
		});
	});

	return promise;
};

export const getAutoCompleteSearch = async (searchText, uid) => {
	var promise = new Promise((resolve, reject) => {
		if (searchText != '') {
			const formData = new FormData();
			formData.append('searchKey', searchText);
			formData.append('uid', uid);

			console.log('searchText', searchText);
			axios.post('https://school.kutubee.com:4000/book/search_autocomplete', formData).then((res) => {
				resolve(res.data);
			});
		} else {
			resolve([]);
		}
	});

	return promise;
};

export const getSearchResults = async (searchText, uid) => {
	var promise = new Promise((resolve, reject) => {
		if (searchText != '') {
			const formData = new FormData();
			formData.append('searchKey', searchText);
			formData.append('uid', uid);

			axios.post('https://school.kutubee.com:4000/book/search', formData).then((res) => {
				console.log('res.data', res.data);
				resolve(res.data);
			});
		} else {
			resolve([]);
		}
	});

	return promise;
};

export const getRelatedBooks = async (uid, language, bookId) => {
	var promise = new Promise((resolve, reject) => {
		const formData = new FormData();
		formData.append('uid', uid);
		formData.append('language', language);
		formData.append('bookId', bookId);
		axios.post('https://school.kutubee.com:4000/book/related/lists', formData).then((res) => {
			resolve(res.data);
		});
	});

	return promise;
};

export const saveAvatarData = async (fullScreenShot, headScreenShot, avatarData, uid) => {
	var promise = new Promise((resolve, reject) => {
		const formData = new FormData();
		formData.append('uid', uid);
		formData.append('imageDataBody', fullScreenShot);
		formData.append('imageDataHead', headScreenShot);
		formData.append('data', JSON.stringify(avatarData));
		axios
			.post('https://school.kutubee.com:4000/user/upload_avatar', formData)
			.then((res) => {
				resolve(res.data);
			})
			.catch((error) => {
				console.log('errrror', error);
			});
	});

	return promise;
};

export const getAvatarData = async (uid) => {
	var promise = new Promise((resolve, reject) => {
		const formData = new FormData();
		formData.append('uid', uid);
		axios
			.post('https://school.kutubee.com:4000/user/avatar/getData', formData)
			.then((res) => {
				resolve(res.data);
			})
			.catch((error) => {
				console.log('errrror', error);
			});
	});

	return promise;
};

export const saveBookProgress = async (loggedInUser, bookId, bookFinishData) => {
	var promise = new Promise((resolve, reject) => {
		if (loggedInUser.userData.type == 'student' || loggedInUser.userData.type == 'individual' || loggedInUser.userData.type == 'teacher') {
			const formData = new FormData();
			formData.append('user_id', loggedInUser.userData._id);
			formData.append('book_id', bookId);
			formData.append('book_data', JSON.stringify(bookFinishData));
			console.log('bookFinishData', bookFinishData);
			let message = {
				status: true,
			};
			// this.props.dispatch({ type: "TOGGLE_CURRENT_BOOK_PROGRESS_SAVED", message });
			axios.post('https://school.kutubee.com:4000/user/v2/pushData', formData).then((res) => {
				console.log('pushData', res.data, formData);
				resolve(res.data);
			});
		}
	});

	return promise;
};

export const getFiltersCategories = async (uid, language) => {
	var promise = new Promise((resolve, reject) => {
		const formData = new FormData();
		formData.append('uid', uid);
		formData.append('language', language);
		axios.post('https://school.kutubee.com:4000/filter/get_levels', formData).then((res) => {
			resolve(res.data);
		});
	});

	return promise;
};

export const addBookRate = async (bid, uid, rate) => {
	var promise = new Promise((resolve, reject) => {
		const formData = new FormData();
		formData.append('book_id', bid);
		formData.append('user_id', uid);
		formData.append('rate_value', rate);
		axios.post('https://school.kutubee.com:4000/rate/user', formData).then((res) => {
			resolve(res.data);
		});
	});

	return promise;
};

export const earnPoints = async (bid, uid, reason) => {
	var promise = new Promise((resolve, reject) => {
		const formData = new FormData();
		formData.append('uid', uid);
		formData.append('bid', bid);
		formData.append('reason', reason);
		axios.post('https://school.kutubee.com:4000/user/point/push', formData).then((res) => {
			resolve(res.data);
		});
	});

	return promise;
};

export const getUserPlacementTests = async (uid, language) => {
	var promise = new Promise((resolve, reject) => {
		const formData = new FormData();
		formData.append('uid', uid);
		formData.append('language', language);
		axios.post('https://school.kutubee.com:4000/placementtest/getUserList', formData).then((res) => {
			resolve(res.data);
		});
	});

	return promise;
};

export const sendPlacementTestData = async (uid, pid, answers, noOfCorrectAnswers, noOfQuestions) => {
	var promise = new Promise((resolve, reject) => {
		const formData = new FormData();
		formData.append('uid', uid);
		formData.append('pid', pid);
		formData.append('noOfCorrectAnswers', noOfCorrectAnswers);
		formData.append('noOfQuestions', noOfQuestions);
		formData.append('answers', JSON.stringify(answers));
		axios.post('https://school.kutubee.com:4000/placementtest/pushData', formData).then((res) => {
			console.log('111111111111111: ', res.data, formData);
			resolve(res.data);
		});
	});

	return promise;
};

export const sendQuizData = async (uid, bid, answers, noOfCorrectAnswers, noOfQuestions, pass) => {
	var promise = new Promise((resolve, reject) => {
		const formData = new FormData();
		formData.append('uid', uid);
		formData.append('bid', bid);
		formData.append('pass', pass);
		formData.append('noOfCorrectAnswers', noOfCorrectAnswers);
		formData.append('noOfQuestions', noOfQuestions);
		formData.append('answers', JSON.stringify(answers));
		axios.post('https://school.kutubee.com:4000/book/app/quiz/v2/pushdata', formData).then((res) => {
			console.log('111111111111111: ', res.data, formData);
			resolve(res.data);
		});
	});

	return promise;
};

export const normalLogin = async (username, password, dispatch) => {
	var promise = new Promise(async (resolve, reject) => {
		// let fcmToken = await getFcmToken()
		const formData = new FormData();
		formData.append('username', username.trim());
		formData.append('password', password);
		// formData.append('fcmToken', fcmToken);
		// formData.append('platform', Platform.OS == 'android' ? 'android' : 'ios');
		// formData.append('userSubscriptions', JSON.stringify(purchases));
		axios
			.post('https://school.kutubee.com:4000/app/v2/login', formData)
			.then(async (res) => {
				console.log('res.data.message', res.data, formData);
				if (res.data.message == 'success') {
					if (res.data.expired) {
						console.log('expired');
						resolve('expired');
					} else {
						try {
							localStorage.setItem('userLoggedIn', 'true');
							localStorage.setItem(
								'userLoggedData',
								JSON.stringify({
									userData: res.data.user,
									userLevel: res.data.level,
									nextLevel: res.data.nextLevel,
									userLevelEn: res.data.levelEn,
									nextLevelEn: res.data.nextLevelEn,
									userLevelFr: res.data.levelFr,
									nextLevelFr: res.data.nextLevelFr,
								})
							);

							let message = {
								userData: {
									userData: res.data.user,
									userLevel: res.data.level,
									nextLevel: res.data.nextLevel,
									userLevelEn: res.data.levelEn,
									nextLevelEn: res.data.nextLevelEn,
									userLevelFr: res.data.levelFr,
									nextLevelFr: res.data.nextLevelFr,
								},
							};
							dispatch({ type: 'SAVE_LOGGEDIN_USER', message });

							resolve({
								type: res.data.user.type,
								status: 'success',
								avatarExists: res.data.user.avatarExists,
							});
						} catch (error) {
							console.log(error);
						}
					}
					return;
				} else {
					// console.log('resssss', res.data.messageTxt)
					if (res.data.messageTxt != undefined) {
						if (res.data.messageTxt == 'purchaseToken') {
							resolve('no subscription');
							// let message = {
							//     userData: {
							//         userId: res.data.userId,
							//     }
							// };
							// this.props.dispatch({ type: "GET_INDIVIDUAL_NEW_DATA", message });
							// goToNewIndividualSubscription(this.props.componentId, 'normal')
						} else {
							resolve('failed');
							// this.setState({
							//     showError: true,
							//     errorMessage: I18t.t('login.incorrect'),
							//     logging: false
							// })
						}
					} else {
						resolve('failed');
						this.setState({
							showError: true,
							errorMessage: I18t.t('login.incorrect'),
							logging: false,
						});
					}
				}
			})
			.catch((error) => {
				// this.setState({
				//     logging: false
				// })
			});
	});

	return promise;
};
export const socialLogin = async (socialId, type, dispatch) => {
	var promise = new Promise(async (resolve, reject) => {
		const formData = new FormData();
		formData.append('id', socialId);
		formData.append('type', type);

		axios
			.post('https://school.kutubee.com:4000/individual/v3/socialmedia_login', formData)
			.then(async (res) => {
				console.log('res.data.message', res.data, formData);
				if (res.data.message == 'success') {
					if (res.data.expired) {
						console.log('expired');
						resolve('expired');
					} else {
						try {
							localStorage.setItem('userLoggedIn', 'true');
							localStorage.setItem(
								'userLoggedData',
								JSON.stringify({
									userData: res.data.user,
									userLevel: res.data.level,
									nextLevel: res.data.nextLevel,
									userLevelEn: res.data.levelEn,
									nextLevelEn: res.data.nextLevelEn,
									userLevelFr: res.data.levelFr,
									nextLevelFr: res.data.nextLevelFr,
								})
							);

							let message = {
								userData: {
									userData: res.data.user,
									userLevel: res.data.level,
									nextLevel: res.data.nextLevel,
									userLevelEn: res.data.levelEn,
									nextLevelEn: res.data.nextLevelEn,
									userLevelFr: res.data.levelFr,
									nextLevelFr: res.data.nextLevelFr,
								},
							};
							console.log('mmmmmmmmm', message);
							dispatch({ type: 'SAVE_LOGGEDIN_USER', message });

							resolve('success');
						} catch (error) {
							console.log(error);
						}
					}
					return;
				} else {
					// console.log('resssss', res.data.messageTxt)
					if (res.data.messageTxt != undefined) {
						if (res.data.messageTxt == 'purchaseToken') {
							resolve('no subscription');
							// let message = {
							//     userData: {
							//         userId: res.data.userId,
							//     }
							// };
							// this.props.dispatch({ type: "GET_INDIVIDUAL_NEW_DATA", message });
							// goToNewIndividualSubscription(this.props.componentId, 'normal')
						} else {
							resolve('failed');
							// this.setState({
							//     showError: true,
							//     errorMessage: I18t.t('login.incorrect'),
							//     logging: false
							// })
						}
					} else {
						resolve('failed');
						this.setState({
							showError: true,
							errorMessage: I18t.t('login.incorrect'),
							logging: false,
						});
					}
				}
			})
			.catch((error) => {
				// this.setState({
				//     logging: false
				// })
			});
	});

	return promise;
};
export const loginGoogleClassroom = async (socialId, type, email, dispatch) => {
	var promise = new Promise(async (resolve, reject) => {
		const formData = new FormData();
		// formData.append('id', socialId);
		formData.append('type', type);
		formData.append('email', email);
		formData.append('platform', 'web');

		axios
			.post('https://school.kutubee.com:4000/app/email/login', formData)
			.then(async (res) => {
				console.log('res.data.message', res.data, formData);
				if (res.data.message == 'success') {
					if (res.data.expired) {
						console.log('expired');
						resolve('expired');
					} else {
						try {
							localStorage.setItem('userLoggedIn', 'true');
							localStorage.setItem(
								'userLoggedData',
								JSON.stringify({
									userData: res.data.user,
									userLevel: res.data.level,
									nextLevel: res.data.nextLevel,
									userLevelEn: res.data.levelEn,
									nextLevelEn: res.data.nextLevelEn,
									userLevelFr: res.data.levelFr,
									nextLevelFr: res.data.nextLevelFr,
								})
							);

							let message = {
								userData: {
									userData: res.data.user,
									userLevel: res.data.level,
									nextLevel: res.data.nextLevel,
									userLevelEn: res.data.levelEn,
									nextLevelEn: res.data.nextLevelEn,
									userLevelFr: res.data.levelFr,
									nextLevelFr: res.data.nextLevelFr,
								},
							};
							console.log('mmmmmmmmm', message);
							dispatch({ type: 'SAVE_LOGGEDIN_USER', message });

							resolve('success');
						} catch (error) {
							console.log(error);
						}
					}
					return;
				} else {
					// console.log('resssss', res.data.messageTxt)
					if (res.data.messageTxt != undefined) {
						if (res.data.messageTxt == 'purchaseToken') {
							resolve('no subscription');
							// let message = {
							//     userData: {
							//         userId: res.data.userId,
							//     }
							// };
							// this.props.dispatch({ type: "GET_INDIVIDUAL_NEW_DATA", message });
							// goToNewIndividualSubscription(this.props.componentId, 'normal')
						} else {
							resolve('failed');
							// this.setState({
							//     showError: true,
							//     errorMessage: I18t.t('login.incorrect'),
							//     logging: false
							// })
						}
					} else {
						resolve('failed');
						this.setState({
							showError: true,
							errorMessage: I18t.t('login.incorrect'),
							logging: false,
						});
					}
				}
			})
			.catch((error) => {
				// this.setState({
				//     logging: false
				// })
			});
	});

	return promise;
};

export const getUpdateUserData = (userId, sessionToken, dispatch, userType) => {
	var promise = new Promise((resolve, reject) => {
		const formData2 = new FormData();
		formData2.append('userId', userId);
		formData2.append('sessionToken', sessionToken);

		axios.post('https://school.kutubee.com:4000/app/getUserData2', formData2).then(async (res) => {
			if (res.data.message == 'success') {
				if (res.data.expired) {
					localStorage.removeItem('userLoggedIn');
					localStorage.removeItem('userLoggedData');
					resolve('expired');
				} else {
					if (userType == 'teacher' || userType == 'student') {
						localStorage.setItem('userLoggedIn', 'true');
						localStorage.setItem(
							'userLoggedData',
							JSON.stringify({
								userData: res.data.user,
								userLevel: res.data.level,
								nextLevel: res.data.nextLevel,
								userLevelEn: res.data.levelEn,
								nextLevelEn: res.data.nextLevelEn,
								userLevelFr: res.data.levelFr,
								nextLevelFr: res.data.nextLevelFr,
							})
						);

						// if (res.data.user.avatarlink != undefined) {
						//   res.data.user.avatarlink = res.data.user.avatarlink + '?c=' + new Date().getTime()
						// }
						var message = {
							userData: {
								userData: res.data.user,
								userLevel: res.data.level,
								nextLevel: res.data.nextLevel,
								userLevelEn: res.data.levelEn,
								nextLevelEn: res.data.nextLevelEn,
								userLevelFr: res.data.levelFr,
								nextLevelFr: res.data.nextLevelFr,
							},
						};
						dispatch({ type: 'SAVE_LOGGEDIN_USER', message });

						resolve({
							type: res.data.user.type,
							status: 'verified',
						});
					} else {
						// if (res.data.user.avatarlink != undefined) {
						//   res.data.user.avatarlink = res.data.user.avatarlink + '?c=' + new Date().getTime()
						// }
						let subAccounts = res.data.subAccounts.map((account) => {
							return {
								userData: account.user,
								userLevel: account.level,
								nextLevel: account.nextLevel,
								userLevelEn: account.levelEn,
								nextLevelEn: account.nextLevelEn,
								userLevelFr: account.levelFr,
								nextLevelFr: res.nextLevelFr,
							};
						});
						let findAccount = subAccounts.find((user) => {
							return user.userData._id == userId;
						});
						if (findAccount == undefined) {
							findAccount = {
								userData: res.data.user,
								userLevel: res.data.level,
								nextLevel: res.data.nextLevel,
							};
							// if (findAccount.userData.avatarData != undefined) {
							//     let userAvatarData = {
							//         userAvatarData: findAccount.userData.avatarData,
							//         gender: findAccount.userData.gender
							//     }
							//     dispatch({ type: "LOAD_USER_AVATAR_DATA", userAvatarData });
							// }
						} else {
							// if (res.data.user.avatarData != undefined) {
							//     let userAvatarData = {
							//         userAvatarData: res.data.user.avatarData,
							//         gender: res.data.user.gender
							//     }
							//     dispatch({ type: "LOAD_USER_AVATAR_DATA", userAvatarData });
							// }
						}
						localStorage.setItem(
							'userLoggedData',
							JSON.stringify({
								userData: findAccount.userData,
								userLevel: findAccount.userLevel,
								nextLevel: findAccount.nextLevel,
								userLevelEn: findAccount.levelEn,
								nextLevelEn: findAccount.nextLevelEn,
								userLevelFr: findAccount.levelFr,
								nextLevelFr: findAccount.nextLevelFr,
							})
						);
						localStorage.setItem(
							'userSubAccounts',
							JSON.stringify({
								subAccounts: subAccounts,
								mainAccount: {
									userData: res.data.user,
									userLevel: res.data.level,
									nextLevel: res.data.nextLevel,
									userLevelEn: res.data.levelEn,
									nextLevelEn: res.data.nextLevelEn,
									userLevelFr: res.data.levelFr,
									nextLevelFr: res.data.nextLevelFr,
								},
							})
						);
						message = {
							userData: {
								userData: findAccount.userData,
								userLevel: findAccount.userLevel,
								nextLevel: findAccount.nextLevel,
								userLevelEn: findAccount.levelEn,
								nextLevelEn: findAccount.nextLevelEn,
								userLevelFr: findAccount.levelFr,
								nextLevelFr: findAccount.nextLevelFr,
							},
						};
						dispatch({ type: 'SAVE_LOGGEDIN_USER', message });

						resolve({
							type: res.data.user.type,
							status: 'verified',
						});
					}
				}
			} else {
				resolve('not-verified');
			}
		});
	});

	return promise;
};
export const getTagBooks = async (uid, tid) => {
	var promise = new Promise((resolve, reject) => {
		const formData = new FormData();
		formData.append('uid', uid);
		formData.append('tagId', tid);
		axios.post('https://school.kutubee.com:4000/books/get/tags', formData).then((res) => {
			resolve(res.data);
		});
	});

	return promise;
};
export const getSkillsData = async (uid, language) => {
	var promise = new Promise((resolve, reject) => {
		const formData = new FormData();
		formData.append('uid', uid);
		formData.append('language', language);
		axios.post('https://school.kutubee.com:4000/skill_development/userData', formData).then((res) => {
			resolve(res.data);
			// console.log("skillsdata", res.data)
		});
	});

	return promise;
};
export const getCompletedData = async (language, uid) => {
	var promise = new Promise((resolve, reject) => {
		const formData = new FormData();

		formData.append('language', language);
		formData.append('uid', uid);
		axios.post('https://school.kutubee.com:4000/completedBooks/userData', formData).then((res) => {
			resolve(res.data);
			console.log('getCompletedData', res.data);
		});
	});

	return promise;
};

export const getUserAccounts = (userId, sessionToken, dispatch) => {
	var promise = new Promise((resolve, reject) => {
		const formData2 = new FormData();
		formData2.append('userId', userId);
		formData2.append('sessionToken', sessionToken);

		axios.post('https://school.kutubee.com:4000/app/getUserData2', formData2).then(async (res) => {
			if (res.data.message == 'success') {
				resolve(res.data);
			}
		});
	});

	return promise;
};

export const getWeeklyprogress = (fromDate, toDate, uid, language = 'en') => {
	var promise = new Promise((resolve, reject) => {
		const formData2 = new FormData();
		formData2.append('fromDate', fromDate);
		formData2.append('toDate', toDate);
		formData2.append('language', language);
		formData2.append('uid', uid);

		axios.post('https://school.kutubee.com:4000/readingTime/userData/weekly/chart', formData2).then(async (res) => {
			resolve(res.data);
		});
	});

	return promise;
};
export const getMonthlyprogress = (uid, language = 'en') => {
	var promise = new Promise((resolve, reject) => {
		const formData2 = new FormData();

		formData2.append('uid', uid);
		formData2.append('language', language);

		axios.post('https://school.kutubee.com:4000/readingTime/userData/monthly/chart', formData2).then(async (res) => {
			resolve(res.data);
			console.log('progress', res.data);
		});
	});

	return promise;
};
export const getWeeklytimprogress = (language, fromDate, toDate, uid) => {
	var promise = new Promise((resolve, reject) => {
		const formData2 = new FormData();
		formData2.append('fromDate', fromDate);
		formData2.append('toDate', toDate);
		formData2.append('language', language);

		formData2.append('uid', uid);

		axios.post('https://school.kutubee.com:4000/readingTime/userData/weekly/total', formData2).then(async (res) => {
			resolve(res.data);
			console.log('progress', res.data);
		});
	});

	return promise;
};
export const getMonthlytimeprogress = (language, uid) => {
	var promise = new Promise((resolve, reject) => {
		const formData2 = new FormData();

		formData2.append('language', language);

		formData2.append('uid', uid);

		axios.post('https://school.kutubee.com:4000/readingTime/userData/monthly/total', formData2).then(async (res) => {
			resolve(res.data);
			console.log('progress', res.data);
		});
	});

	return promise;
};
export const getWeeklydata = (uid) => {
	var promise = new Promise((resolve, reject) => {
		const formData2 = new FormData();

		formData2.append('uid', uid);

		axios.post('https://school.kutubee.com:4000/readingTime/userData/average', formData2).then(async (res) => {
			resolve(res.data);
			console.log('progress', res.data);
		});
	});

	return promise;
};
export const geLanguageCompletedData = (uid, language) => {
	var promise = new Promise((resolve, reject) => {
		const formData2 = new FormData();

		formData2.append('uid', uid);
		formData2.append('language', language);

		axios.post('https://school.kutubee.com:4000/completedBooks/userData/average', formData2).then(async (res) => {
			resolve(res.data);
			console.log('progress', res.data);
		});
	});

	return promise;
};
export const getPointsData = (uid, language) => {
	var promise = new Promise((resolve, reject) => {
		const formData2 = new FormData();

		formData2.append('uid', uid);
		formData2.append('language', language);

		axios.post('https://school.kutubee.com:4000/userData/totalPoints', formData2).then(async (res) => {
			resolve(res.data);
			console.log('progress', res.data);
		});
	});

	return promise;
};
export const getBadges = (uid, language) => {
	var promise = new Promise((resolve, reject) => {
		const formData2 = new FormData();

		formData2.append('uid', uid);
		formData2.append('language', language);

		axios.post('https://school.kutubee.com:4000/userData/totalBadges', formData2).then(async (res) => {
			resolve(res.data);
		});
	});

	return promise;
};
export const getUserNotifications = async (uid) => {
	var promise = new Promise((resolve, reject) => {
		let formData = new FormData();
		formData.append('uid', uid);
		axios.post('https://school.kutubee.com:4000/user/v2/notifications', formData).then((res) => {
			resolve(res.data);
		});
	});
	return promise;
};

export const getLockedAssets = (uid, gender, avatarType) => {
	var promise = new Promise((resolve, reject) => {
		const formData2 = new FormData();

		formData2.append('avatarType', avatarType);
		formData2.append('gender', gender);
		formData2.append('uid', uid);

		axios.post('https://school.kutubee.com:4000/user/avatar/getAssets', formData2).then(async (res) => {
			resolve(res.data);
			console.log('lockedItems', res.data);
		});
	});

	return promise;
};

export const redeemAsset = (points, Asseststype, type, index, userId, gender) => {
	var promise = new Promise((resolve, reject) => {
		const formData2 = new FormData();
		formData2.append('uid', userId);
		formData2.append('avatarType', type);
		formData2.append('gender', gender);
		if (type == 'monster') {
			if (Asseststype == 'body') {
				formData2.append('assetId', 'avatarAsset_18');
			} else if (Asseststype == 'Eyes') {
				formData2.append('assetId', 'avatarAsset_19');
			} else if (Asseststype == 'Mouth') {
				formData2.append('assetId', 'avatarAsset_21');
			} else if (Asseststype == 'Nose') {
				formData2.append('assetId', 'avatarAsset_20');
			} else if (Asseststype == 'head') {
				formData2.append('assetId', 'avatarAsset_22');
			} else if (Asseststype == 'legs') {
				formData2.append('assetId', 'avatarAsset_24');
			} else if (Asseststype == 'hands') {
				formData2.append('assetId', 'avatarAsset_25');
			} else if (Asseststype == 'hats') {
				formData2.append('assetId', 'avatarAsset_23');
			}
		} else if (type == 'human') {
			if (Asseststype == 'Body') {
				formData2.append('assetId', 'avatarAsset_1');
			} else if (Asseststype == 'Eye') {
				formData2.append('assetId', 'avatarAsset_2');
			} else if (Asseststype == 'Mouth') {
				formData2.append('assetId', 'avatarAsset_3');
			} else if (Asseststype == 'HumanFaceAccessoryBack') {
				formData2.append('assetId', 'avatarAsset_7');
			} else if (Asseststype == 'HumanHeadAccessory') {
				formData2.append('assetId', 'avatarAsset_8');
			} else if (Asseststype == 'Pants') {
				formData2.append('assetId', 'avatarAsset_9');
			} else if (Asseststype == 'shirt') {
				formData2.append('assetId', 'avatarAsset_10');
			} else if (Asseststype == 'Nose') {
				formData2.append('assetId', 'avatarAsset_4');
			} else if (Asseststype == 'Eyebrows') {
				formData2.append('assetId', 'avatarAsset_5');
			} else if (Asseststype == 'Hair') {
				formData2.append('assetId', 'avatarAsset_6');
			} else if (Asseststype == 'Background') {
				formData2.append('assetId', 'avatarAsset_11');
			}
		}

		formData2.append('assetIndx', index);
		formData2.append('points', points);

		axios.post('https://school.kutubee.com:4000/user/avatar/asset/redeem', formData2).then(async (res) => {
			resolve(res.data);
			console.log('redeeeeeeeeem', res.data);
		});
	});

	return promise;
};

export const checkUserActiveAssignment = (uid) => {
	var promise = new Promise((resolve, reject) => {
		const formData2 = new FormData();
		formData2.append('uid', uid);
		axios.post('https://school.kutubee.com:4000/assignment/userdata/checkActive', formData2).then(async (res) => {
			resolve(res.data.count);
		});
	});

	return promise;
};
export const getUserLevelsList = (uid, language) => {
	var promise = new Promise((resolve, reject) => {
		const formData2 = new FormData();
		formData2.append('uid', uid);
		formData2.append('language', language);
		axios.post('https://school.kutubee.com:4000/category/usermap', formData2).then(async (res) => {
			resolve(res.data);
		});
	});
	return promise;
};

export const getPublishers = (language) => {
	var promise = new Promise((resolve, reject) => {
		const formData = new FormData();
		formData.append('lang', language);

		axios.post('https://school.kutubee.com:4000/publisher/app/list', formData).then((res) => {
			resolve(res.data);
		});
	});
	return promise;
};
export const getPublisherBooks = async (uid, pid) => {
	var promise = new Promise((resolve, reject) => {
		console.log('ssssssss');
		const formData = new FormData();
		formData.append('uid', uid);
		formData.append('id', pid);
		console.log('userData', formData);
		axios.post('https://school.kutubee.com:4000/book/publisher/v2/list', formData).then((res) => {
			resolve(res.data);
		});
	});

	return promise;
};
export const getLeaderBoardReading = async (uid, language) => {
	var promise = new Promise((resolve, reject) => {
		const formData = new FormData();
		formData.append('uid', uid);
		formData.append('language', language);
		console.log('userData', formData);
		axios.post('https://school.kutubee.com:4000/leaderboard/level/', formData).then((res) => {
			resolve(res.data);
		});
	});

	return promise;
};
export const getLeaderBoardClass = async (uid) => {
	var promise = new Promise((resolve, reject) => {
		const formData = new FormData();
		formData.append('uid', uid);
		console.log('userData', formData);
		axios.post('https://school.kutubee.com:4000/leaderboard/class', formData).then((res) => {
			resolve(res.data);
		});
	});

	return promise;
};
export const getLeaderBoardSchool = async (uid) => {
	var promise = new Promise((resolve, reject) => {
		const formData = new FormData();
		formData.append('uid', uid);
		console.log('userData', formData);
		axios.post('https://school.kutubee.com:4000/leaderboard/school', formData).then((res) => {
			resolve(res.data);
		});
	});

	return promise;
};
export const getLeaderData = async (uid, language) => {
	var promise = new Promise((resolve, reject) => {
		const formData = new FormData();
		formData.append('uid', uid);
		formData.append('language', language);

		console.log('userData', formData);
		axios.post('https://school.kutubee.com:4000/leaderboard/blocks', formData).then((res) => {
			resolve(res.data);
		});
	});

	return promise;
};
export const getCompletedBooksList = (uid, language) => {
	var promise = new Promise((resolve, reject) => {
		const formData2 = new FormData();
		formData2.append('uid', uid);
		formData2.append('language', language);
		axios.post('https://school.kutubee.com:4000/completedBooks/user/report', formData2).then(async (res) => {
			resolve(res.data);
		});
	});
	return promise;
};
export const getFriendsList = (uid, bid, showMore) => {
	var promise = new Promise((resolve, reject) => {
		const formData2 = new FormData();
		formData2.append('uid', uid);
		formData2.append('bid', bid);
		formData2.append('showMore', showMore);

		axios.post('https://school.kutubee.com:4000/user/friends/list', formData2).then(async (res) => {
			resolve(res.data);
		});
	});
	return promise;
};
export const getFriendProfile = (uid) => {
	var promise = new Promise((resolve, reject) => {
		const formData2 = new FormData();
		formData2.append('uid', uid);

		axios.post('https://school.kutubee.com:4000/user/profile/data', formData2).then(async (res) => {
			resolve(res.data);
		});
	});
	return promise;
};
