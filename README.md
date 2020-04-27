## us-covid-19-visualization

Work in progress.

A visualization of the COVID-19 epidemic in the United States. Built with Perl, React and D3.js.

Data used in the visualization is sourced from the [2019 Novel Coronavirus COVID-19 (2019-nCoV) Data Repository by Johns Hopkins CSSE](https://github.com/CSSEGISandData/COVID-19).

Data for individual states is parsed with a Perl script, which, currently, only gathers the cumulative amount of deaths per state. To run the script, first please make sure that the perl version of your is current enough by running at the terminal prompt the command

```perl -v```

Perl 5 version 18 is currently expected. The script presumes that the perl interpreter is found at the filepath /usr/bin/perl (Linux and Mac OS X systems). To make sure you system complies with this, please run at the terminal prompt the command 

```which perl```

Should the result of the command differ from that of the script, please make the necessary changes to the beginning of the script. After that, the script can be run at the terminal prompt with the command 

```./create_us_covid_data```

The visualization is hosted at ZEIT Now: <https://us-covid-19-visualization.now.sh/>.
