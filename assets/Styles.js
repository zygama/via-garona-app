import { StyleSheet } from "react-native"

// const styles = StyleSheet.create({
export default StyleSheet.create({
	/*
	*
	*
	*
	*CONTAINER*/
	container: {
		flex: 1,
		backgroundColor: '#000000'
	},
	main_container: {
		flex: 6
	},
	/*
	*
	*
	*
	*HEADER*/
	header: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: 'rgba(115, 0, 125, 0.5)',
		paddingTop: 25,
		paddingBottom: 5
	},
	headerImage: {
		width: 50,
		height: 50,
	},
	/*
	*
	*
	*
	*TABBAR*/
	tabBar: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginTop: 10,
		// backgroundColor: '#3B68CD',
		backgroundColor: 'rgba(59, 104, 105, 0.5)',
		padding: 10
	},
	highlighter: {
		borderRadius: 15
	},
	tabBarLink: {
		flexDirection: 'column',
	},
	tabBarTitle: {
		textAlign: 'center',
		color: 'white',
	},
	tabBarImage: {
		padding: 5
	},
	/*
	*
	*
	*
	*LISTFUNC*/
	listFunc: {
		flex: 3,
		flexDirection: 'column',
		justifyContent: 'space-around',
		marginTop: 10,
		backgroundColor: '#DE7947',
		backgroundColor: 'rgba(222, 121, 71, 0.5)',
		padding: 10
	},
	listFuncLink: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	listTitle: {
		textAlign: 'center',
		fontSize: 25,
		color: 'white',
	},
	listFuncTitle: {
		flex: 3,
		backgroundColor: 'transparent',
		textAlign: 'left',
		color: 'white',
		fontSize: 18,
		paddingLeft: 20
	},
	listFuncImage: {
		flex: 1
	},
	/*
	*
	*
	*
	*IMAGES*/
	image: {
		width: 80,
		height: 80,
		resizeMode: 'contain',
	},
	whiteIcon: {
		tintColor: 'white',
	},
	/*
	*
	*
	*
	*BURGER*/
	burger: {
		padding: 20,
		paddingLeft: 50,
		// paddingTop: 80,
		backgroundColor: '#666',
		flex: 1
	},
	headerBurger: {
		backgroundColor: '#527AFD',
		flex: 1
	},
	contentBurger: {
		backgroundColor: '#201E51',
		flex: 4,
		// justifyContent: 'space-around',
		// alignItems: 'center'
		// alignItems: 'stretch'
	},
	// contentBurgerTitle: {
	// },
	contentBurgerImage: {
		width: 15,
		height: 15,
	},
});