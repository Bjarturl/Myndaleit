import React from "react";
import ReactLoading from "react-loading";

import Input from "../../components/Input";
import CustomCard from "../../components/CustomCard";
import NextButton from "../../components/NextButton";

import { GET } from "../../services/api_calls";
import { NUM_RESULTS } from "../../constants";
import { formatThousands, getPropIfExists } from "../../utils/helpers";

import "./styles.css";

const defaultPageInfo = {
  index: 0,
  page: 1,
  maxPage: 1,
};

// A component that holds all image search functionality and appearance
export default class ImageSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search_string: "",
      data: [], // Images for this page
      loading: false, // Whether content is loading or not
      message: "", // For informing user of query status
      pageInfo: defaultPageInfo,
    };
  }

  //Update search string when user types a letter
  onInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  // Handler for when the user presses 'surprise me' button
  surpriseMe() {
    // Fetch a random word and then update the search string with it
    GET.getRandomWord().then((word) => {
      this.setState({ search_string: word });
      this.search();
    });
  }

  // Handler for when the user searches a specific search string
  search() {
    this.setState({ pageInfo: defaultPageInfo }, () => {
      this.fetchResults();
    });
  }

  // Fetches results from the api and updates state accordingly
  fetchResults(back) {
    const { search_string } = this.state;
    // Do nothing if nothing is typed
    if (!search_string) {
      return;
    }
    // Check if we are navigating back or not
    let i = back
      ? this.state.pageInfo.index - 2 * NUM_RESULTS
      : this.state.pageInfo.index;
    i = i < 0 ? 0 : i; // Make sure index is 0 or larger
    // Add loading animation
    this.setState({ loading: true, data: [], pageInfo: defaultPageInfo });
    GET.getImageSearchResults(search_string, i).then((data) => {
      if (data.error) {
        // Invalid request
        this.setState({
          message: `Eitthvað fór úrskeiðis við leit þína á "${search_string}". Vinsamlegast reyndu aftur.`,
          loading: false,
        });
        // If request is valid, but nothing was found
      } else if (!data.items) {
        this.setState({
          message: `Engar niðurstöður fundust fyrir "${search_string}".`,
          loading: false,
        });
        // If search is successful
      } else if (data.items) {
        let results = getPropIfExists(data, "searchInformation.totalResults", 0);
        let maxPage = Math.floor(parseInt(results / NUM_RESULTS) + 1);
        let index = getPropIfExists(data, "queries.nextPage[0].startIndex");
        let page = index ? Math.floor(index / NUM_RESULTS) : maxPage;
        this.setState({
          data: data.items,
          loading: false,
          message: 
            `Fann ${formatThousands(results)} 
            niðurstöður fyrir "${search_string}".`,
          pageInfo: {
            index: index ? index : 0,
            page: page,
            maxPage: maxPage,
          },
        });
      }
    });
  }

  // Returns formatted list of results in a custom card component
  formatResults() {
    const { data } = this.state;
    return data.map((d, i) => (
      <CustomCard
        key={i}
        title={d.title}
        img={d.link}
        href={d.image.contextLink}
      />
    ));
  }

  // Page navigation menu
  getPageController() {
    const { pageInfo, data } = this.state;
    if (data.length == 0) {
      return <></>;
    }
    return (
      <div className="d-flex justify-content-center align-items-center">
        {/* Prev page button */}
        <NextButton
          htmlClass="mr-3"
          hidden={pageInfo.page == 1}
          direction="left"
          onClick={() => {
            this.fetchResults("-");
          }}
        />
        {/* Current page status */}
        <span>
          <strong></strong>Síða {formatThousands(pageInfo.page)} af{" "}
          {formatThousands(pageInfo.maxPage)}
        </span>
        {/* Next page button */}
        <NextButton
          htmlClass="ml-3"
          hidden={pageInfo.page == pageInfo.maxPage}
          direction="right"
          onClick={() => {
            this.fetchResults();
          }}
        />
      </div>
    );
  }

  render() {
    const { search_string, loading, message } = this.state;
    return (
      <div className="image-search">
        <div className="img-search-header-row">
          <h1 className="page-header mb-4">Myndaleit</h1>
          {/* Accept input and query API for images */}
          <div className="d-flex">
            <Input
              value={search_string}
              onInput={(e) => {
                this.onInput(e);
              }}
              onEnter={() => {
                this.search();
              }}
              type="text"
              name="search_string"
              htmlId="search-string"
              placeholder="Leitarorð"
            />
            {/* Magnifying glass icon for searching */}
            <i
              className="fa fa-search fa-2x ml-3 mt-1 hover"
              onClick={() => this.search()}
            />
          </div>
          {/* Surprise me button! */}
          <button
            className="btn golden-btn mb-2"
            onClick={() => {
              this.surpriseMe();
            }}>
            Komdu mér á óvart
          </button>
          {/* Query status message */}
          <span>{message}</span>
        </div>
        {/* Display images in a grid */}
        <div className="d-flex flex-column">
          {loading ? (
            <div className="d-flex flex-column align-items-center">
              <ReactLoading type="bars" width={200} height={200} />
              <strong>Hleð...</strong>
            </div>
          ) : (
            <div className="img-search-results-row">{this.formatResults()}</div>
          )}
          {/* Call a handler for displaying the page navigation menu */}
          {this.getPageController()}
        </div>
      </div>
    );
  }
}
