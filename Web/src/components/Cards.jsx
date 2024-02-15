import React from "react";

const Cards = () => {
  return (
    <>
      {/*Main layout*/}
      <main className="my-5">
        <div className="container">
          {/*Section: Content*/}
          <section>
            <div className="row gx-5">
              <div className="animate__animated animate__bounce col-lg-4 col-md-12 mb-4 mb-lg-0">
                {/* News block */}
                <div>
                  {/* Featured image */}
                  <div
                    className="bg-image hover-overlay shadow-1-strong mb-4"
                    data-mdb-ripple-init=""
                    data-mdb-ripple-color="light"
                  >
                    <img
                      src="https://mdbootstrap.com/img/new/fluid/city/113.jpg"
                      className="img-fluid"
                    />
                    <a href="#!">
                      <div
                        className="mask"
                        style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                      />
                    </a>
                  </div>
                  {/* Article data */}
                  <div className="row mb-3">
                    <div className="col-6">
                      <a href="" className="text-info">
                        <i className="fas fa-plane" />
                        Travels
                      </a>
                    </div>
                    <div className="col-6 text-end">
                      <u> 15.07.2020</u>
                    </div>
                  </div>
                  {/* Article title and description */}
                  <a href="" className="text-dark">
                    <h5>This is title of the news</h5>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Odit, iste aliquid. Sed id nihil magni, sint vero
                      provident esse numquam perferendis ducimus dicta adipisci
                      iusto nam temporibus modi animi laboriosam?
                    </p>
                  </a>
                  <hr />
                  {/* News */}
                  <a href="" className="text-dark">
                    <div className="row mb-4 border-bottom pb-2">
                      <div className="col-3">
                        <img
                          src="https://mdbootstrap.com/img/new/standard/city/041.jpg"
                          className="img-fluid shadow-1-strong rounded"
                          alt=""
                        />
                      </div>
                      <div className="col-9">
                        <p className="mb-2">
                          <strong>Lorem ipsum dolor sit amet</strong>
                        </p>
                        <p>
                          <u> 15.07.2020</u>
                        </p>
                      </div>
                    </div>
                  </a>
                  {/* News */}
                  <a href="" className="text-dark">
                    <div className="row mb-4 border-bottom pb-2">
                      <div className="col-3">
                        <img
                          src="https://mdbootstrap.com/img/new/standard/city/042.jpg"
                          className="img-fluid shadow-1-strong rounded"
                          alt=""
                        />
                      </div>
                      <div className="col-9">
                        <p className="mb-2">
                          <strong>Lorem ipsum dolor sit amet</strong>
                        </p>
                        <p>
                          <u> 15.07.2020</u>
                        </p>
                      </div>
                    </div>
                  </a>
                  {/* News */}
                  <a href="" className="text-dark">
                    <div className="row mb-4 border-bottom pb-2">
                      <div className="col-3">
                        <img
                          src="https://mdbootstrap.com/img/new/standard/city/043.jpg"
                          className="img-fluid shadow-1-strong rounded"
                          alt=""
                        />
                      </div>
                      <div className="col-9">
                        <p className="mb-2">
                          <strong>Lorem ipsum dolor sit amet</strong>
                        </p>
                        <p>
                          <u> 15.07.2020</u>
                        </p>
                      </div>
                    </div>
                  </a>
                  {/* News */}
                  <a href="" className="text-dark">
                    <div className="row mb-4 border-bottom pb-2">
                      <div className="col-3">
                        <img
                          src="https://mdbootstrap.com/img/new/standard/city/044.jpg"
                          className="img-fluid shadow-1-strong rounded"
                          alt=""
                        />
                      </div>
                      <div className="col-9">
                        <p className="mb-2">
                          <strong>Lorem ipsum dolor sit amet</strong>
                        </p>
                        <p>
                          <u> 15.07.2020</u>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                {/* News block */}
              </div>
              <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                {/* News block */}
                <div>
                  {/* Featured image */}
                  <div
                    className="bg-image hover-overlay shadow-1-strong mb-4"
                    data-mdb-ripple-init=""
                    data-mdb-ripple-color="light"
                  >
                    <img
                      src="https://mdbootstrap.com/img/new/fluid/city/011.jpg"
                      className="img-fluid"
                    />
                    <a href="#!">
                      <div
                        className="mask"
                        style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                      />
                    </a>
                  </div>
                  {/* Article data */}
                  <div className="row mb-3">
                    <div className="col-6">
                      <a href="" className="text-danger">
                        <i className="fas fa-chart-pie" />
                        Business
                      </a>
                    </div>
                    <div className="col-6 text-end">
                      <u> 15.07.2020</u>
                    </div>
                  </div>
                  {/* Article title and description */}
                  <a href="" className="text-dark">
                    <h5>This is title of the news</h5>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Odit, iste aliquid. Sed id nihil magni, sint vero
                      provident esse numquam perferendis ducimus dicta adipisci
                      iusto nam temporibus modi animi laboriosam?
                    </p>
                  </a>
                  <hr />
                  {/* News */}
                  <a href="" className="text-dark">
                    <div className="row mb-4 border-bottom pb-2">
                      <div className="col-3">
                        <img
                          src="https://mdbootstrap.com/img/new/standard/city/031.jpg"
                          className="img-fluid shadow-1-strong rounded"
                          alt=""
                        />
                      </div>
                      <div className="col-9">
                        <p className="mb-2">
                          <strong>Lorem ipsum dolor sit amet</strong>
                        </p>
                        <p>
                          <u> 15.07.2020</u>
                        </p>
                      </div>
                    </div>
                  </a>
                  {/* News */}
                  <a href="" className="text-dark">
                    <div className="row mb-4 border-bottom pb-2">
                      <div className="col-3">
                        <img
                          src="https://mdbootstrap.com/img/new/standard/city/032.jpg"
                          className="img-fluid shadow-1-strong rounded"
                          alt=""
                        />
                      </div>
                      <div className="col-9">
                        <p className="mb-2">
                          <strong>Lorem ipsum dolor sit amet</strong>
                        </p>
                        <p>
                          <u> 15.07.2020</u>
                        </p>
                      </div>
                    </div>
                  </a>
                  {/* News */}
                  <a href="" className="text-dark">
                    <div className="row mb-4 border-bottom pb-2">
                      <div className="col-3">
                        <img
                          src="https://mdbootstrap.com/img/new/standard/city/033.jpg"
                          className="img-fluid shadow-1-strong rounded"
                          alt=""
                        />
                      </div>
                      <div className="col-9">
                        <p className="mb-2">
                          <strong>Lorem ipsum dolor sit amet</strong>
                        </p>
                        <p>
                          <u> 15.07.2020</u>
                        </p>
                      </div>
                    </div>
                  </a>
                  {/* News */}
                  <a href="" className="text-dark">
                    <div className="row mb-4 border-bottom pb-2">
                      <div className="col-3">
                        <img
                          src="https://mdbootstrap.com/img/new/standard/city/034.jpg"
                          className="img-fluid shadow-1-strong rounded"
                          alt=""
                        />
                      </div>
                      <div className="col-9">
                        <p className="mb-2">
                          <strong>Lorem ipsum dolor sit amet</strong>
                        </p>
                        <p>
                          <u> 15.07.2020</u>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                {/* News block */}
              </div>
              <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                {/* News block */}
                <div>
                  {/* Featured image */}
                  <div
                    className="bg-image hover-overlay shadow-1-strong mb-4"
                    data-mdb-ripple-init=""
                    data-mdb-ripple-color="light"
                  >
                    <img
                      src="https://mdbootstrap.com/img/new/fluid/city/018.jpg"
                      className="img-fluid"
                    />
                    <a href="#!">
                      <div
                        className="mask"
                        style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                      />
                    </a>
                  </div>
                  {/* Article data */}
                  <div className="row mb-3">
                    <div className="col-6">
                      <a href="" className="text-warning">
                        <i className="fas fa-code" />
                        Technology
                      </a>
                    </div>
                    <div className="col-6 text-end">
                      <u> 15.07.2020</u>
                    </div>
                  </div>
                  {/* Article title and description */}
                  <a href="" className="text-dark">
                    <h5>This is title of the news</h5>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Odit, iste aliquid. Sed id nihil magni, sint vero
                      provident esse numquam perferendis ducimus dicta adipisci
                      iusto nam temporibus modi animi laboriosam?
                    </p>
                  </a>
                  <hr />
                  {/* News */}
                  <a href="" className="text-dark">
                    <div className="row mb-4 border-bottom pb-2">
                      <div className="col-3">
                        <img
                          src="https://mdbootstrap.com/img/new/standard/city/011.jpg"
                          className="img-fluid shadow-1-strong rounded"
                          alt=""
                        />
                      </div>
                      <div className="col-9">
                        <p className="mb-2">
                          <strong>Lorem ipsum dolor sit amet</strong>
                        </p>
                        <p>
                          <u> 15.07.2020</u>
                        </p>
                      </div>
                    </div>
                  </a>
                  {/* News */}
                  <a href="" className="text-dark">
                    <div className="row mb-4 border-bottom pb-2">
                      <div className="col-3">
                        <img
                          src="https://mdbootstrap.com/img/new/standard/city/012.jpg"
                          className="img-fluid shadow-1-strong rounded"
                          alt=""
                        />
                      </div>
                      <div className="col-9">
                        <p className="mb-2">
                          <strong>Lorem ipsum dolor sit amet</strong>
                        </p>
                        <p>
                          <u> 15.07.2020</u>
                        </p>
                      </div>
                    </div>
                  </a>
                  {/* News */}
                  <a href="" className="text-dark">
                    <div className="row mb-4 border-bottom pb-2">
                      <div className="col-3">
                        <img
                          src="https://mdbootstrap.com/img/new/standard/city/013.jpg"
                          className="img-fluid shadow-1-strong rounded"
                          alt=""
                        />
                      </div>
                      <div className="col-9">
                        <p className="mb-2">
                          <strong>Lorem ipsum dolor sit amet</strong>
                        </p>
                        <p>
                          <u> 15.07.2020</u>
                        </p>
                      </div>
                    </div>
                  </a>
                  {/* News */}
                  <a href="" className="text-dark">
                    <div className="row mb-4 border-bottom pb-2">
                      <div className="col-3">
                        <img
                          src="https://mdbootstrap.com/img/new/standard/city/014.jpg"
                          className="img-fluid shadow-1-strong rounded"
                          alt=""
                        />
                      </div>
                      <div className="col-9">
                        <p className="mb-2">
                          <strong>Lorem ipsum dolor sit amet</strong>
                        </p>
                        <p>
                          <u> 15.07.2020</u>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                {/* News block */}
              </div>
            </div>
          </section>
          {/*Section: Content*/}
        </div>
      </main>
      {/*Main layout*/}
    </>
  );
};

export default Cards;
