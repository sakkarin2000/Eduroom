import { Fragment, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import api from '../../api'
import style from '../../styles/learningPathStyles/exercise'

const Exercise = ({ id, nodeID, type }) => {
	const [learningPath, setLearningPath] = useState(null)
	const [correct, setCorrect] = useState(null)
	const [text, setText] = useState('')
	const router = useRouter()
	const fetchLearningPath = async () => {
		try {
			const res = await api.get('/api/learningpath/exercise', { params: { nodeID } })
			setLearningPath(res.data)
			console.log(res.data)
		} catch (err) {
			console.log(err)
		}
	}
	useEffect(() => {
		setCorrect(null)
		setText('')
		fetchLearningPath()
	}, [nodeID])
	const getNextClass = () => {
		return correct ? 'active' : 'disable'
	}
	const getText = () => {
		if (correct === true) {
			return <span style={{ color: 'green' }}>Correct!!</span>
		} else if (correct === false) {
			return <span style={{ color: 'red' }}>Wrong!!</span>
		}
	}
	const checkAnswer = (e) => {
		e.preventDefault()
		setCorrect(text.toLowerCase() === learningPath.answer.toLowerCase())
	}
	const renderPage = () => {
		if (!learningPath) return null
		return (
			<Fragment>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<div className="container">
						<div className="card">
							<div className="back" onClick={() => router.push('/learningpath')}>
								<i className="fas fa-chevron-left"></i>
								{'  Back'}
							</div>
							<div style={{ margin: '30px' }}>
								<h1 className="blue" style={{ margin: '0' }}>
									{learningPath.path_name} Path
								</h1>
								<h3 style={{ margin: '0' }}>{learningPath.node_name}</h3>
								<h4>Question: {learningPath.question}</h4>
								<form onSubmit={checkAnswer} className="form">
									<div style={{ display: 'flex', alignItems: 'center' }}>
										<div style={{ width: '300px' }}>
											<input
												type="text"
												className="textField"
												placeholder="Your answer"
												value={text}
												onChange={(e) => setText(e.target.value)}
											></input>
										</div>
										<div className="check" onClick={checkAnswer}>
											Check answer
										</div>
									</div>
									<div onClick={() => router.push(`/learningpath/${id}/${learningPath.nextNode}`)}>
										<div style={{ fontSize: '20px' }} className={`${getNextClass()}`}>
											Next <i className={`fas fa-chevron-right `} style={{ fontSize: '20px' }}></i>
										</div>
									</div>
								</form>
								<div>{getText()}</div>
							</div>
						</div>
					</div>
				</div>

				<style jsx>{style}</style>
			</Fragment>
		)
	}
	return (
		<Fragment>
			<div>{renderPage()}</div>
		</Fragment>
	)
}

export default Exercise
