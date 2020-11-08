import React, { Fragment, useEffect, useState } from "react"
import { useRouter } from "next/router"
import Box from "../../../../components/graderSubmit/Box"
import Layout from "../../../../components/graderSubmit/Layout"
import style from "../../../../styles/graderSubmit/contests/contestPage/contestHomePage"
import ContestLayout from "../../../../components/graderSubmit/contests/ContestLayout"

const contestOverview = () => {
  const [id, setId] = useState(null)
  const router = useRouter()
  useEffect(() => {
    const ID = router.query.id
    setId(ID)
  }, [])

  return (
    <Fragment>
      <Layout page="contest">
        <div className="main">
          <div className="size">
            <Box>
              <ContestLayout page="overview" id={id}>
                <div className="overview-info">
                  <div className="overview-info-detail">
                    <p className="overview-title">Contest Name</p>
                    <div className="overview-title-detail">
                      Description: Lorem Ipsum used since the 1500s is
                      reproduced below for those interested. Sections 1.10.32
                      and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero
                      are also reproduced in their exact original form,
                      accompanied. Lorem Ipsum used since the 1500s is
                      reproduced below for those interested. Sections 1.10.32
                      and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero
                      are also reproduced in their exact original form,
                      accompanied. Lorem Ipsum used since the 1500s is
                      reproduced below for those interested. Sections 1.10.32
                      and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero
                      are also reproduced in their exact original form,
                      accompanied.
                    </div>
                  </div>
                  <div className="overview-info-status">
                    <div className="status-box">
                      <img src="../../../../images/graderSubmit/statusTrue.svg" />
                      <p className="status-text">ended</p>
                    </div>
                  </div>
                </div>
                <div className="overview-detail">
                  <div className="flex-container">
                    <div className="flex-item">StartAt</div>
                    <div className="flex-item">EndAt</div>
                    <div className="flex-item">ContestType</div>
                    <div className="flex-item">Rule</div>
                    <div className="flex-item">Creator</div>
                  </div>
                </div>
              </ContestLayout>
            </Box>
          </div>
        </div>
      </Layout>
      <style jsx>{style}</style>
    </Fragment>
  )
}
export default contestOverview
