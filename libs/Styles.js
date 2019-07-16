import { StyleSheet} from 'react-native'

export const styles_forms = StyleSheet.create({
    main_container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'skyblue'
    },
    form_container: {
      paddingHorizontal: 20,
      backgroundColor: 'skyblue',
    },
    main_text: {
      color: 'black',
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    text_input: {
      height: 40,
      borderWidth: 0,
      backgroundColor: 'white',
      marginTop: 20,
      paddingHorizontal: 8,
      borderRadius: 10,
    },
    buttons: {
      marginTop: 20,
      alignItems: 'center',
      backgroundColor: '#4286f4',
      padding: 10,
      borderRadius: 10,
    }
  })

export const styles_home = StyleSheet.create({
    main_container: {
      flex: 1,
      backgroundColor: 'rgb(233, 235, 238)',
      flexDirection: 'column',
    },
    main_text: {
      color: 'black',
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    text_input: {
      borderWidth: 0,
      backgroundColor: 'white',
      marginTop: 20,
      paddingHorizontal: 8,
      borderRadius: 10,
    },
    buttons: {
      marginTop: 20,
      alignItems: 'center',
      backgroundColor: '#4286f4',
      padding: 10,
      borderRadius: 10,
    }
  })

export const styles_topHeader = StyleSheet.create({
  topHeader: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(71, 186, 251)',
    height: 80,
    paddingTop: 34.5,
    paddingBottom: 20,
  },
  main_text: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
  },
})

export const styles_profile = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'rgb(233, 235, 238)',
  },
  main_text: {
    color: 'black',
    fontSize: 20,
    paddingHorizontal: 20,
  },
  user_header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 6,
  },
  user_info: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(233, 235, 238)',
    marginTop: 6,
  },
  listas: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(233, 235, 238)', //Light gray
    marginTop: 0,
    marginBottom: 0,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
    borderRadius: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'rgb(233, 235, 238)'
  }
})