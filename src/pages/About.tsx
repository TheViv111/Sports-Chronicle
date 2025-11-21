              </p >

              <p className="reveal-on-scroll">
                {t("about.teamText")}
              </p>

              <h2 className="font-heading text-2xl font-semibold mt-8 mb-4 reveal-on-scroll">
                {t("about.missionTitle")}
              </h2>
              <p className="reveal-on-scroll">
                {t("about.missionText")}
              </p>

{/* Team Section */ }
              <div className="mt-16 mb-12">
                <div className="text-center mb-12">
                  <h2 className="font-heading text-3xl font-bold mb-4 reveal-on-scroll">
                    {t("about.teamTitle")}
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto reveal-on-scroll">
                    {t("about.teamSubtitle")}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 staggered-grid">
                  <Card className="group hover:shadow-lg transition-all duration-300 reveal-on-scroll" style={{ '--stagger-delay': '0ms' } as React.CSSProperties}>
                    <CardContent className="p-6 text-center">
                      <img
                        src={vivaanHandaNew}
                        alt={t("about.team.editor.name")}
                        className="w-24 h-24 mx-auto mb-4 rounded-full object-cover ring-2 ring-primary/20"
                        loading="lazy"
                        decoding="async"
                        width={96}
                        height={96}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/images/team/vivaan.svg"; }}
                      />
                      <h3 className="font-heading text-lg font-semibold mb-2">
                        {t("about.team.editor.name")}
                      </h3>
                      <p className="text-primary text-sm font-medium mb-3">
                        {t("about.team.editor.title")}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {t("about.team.editor.description")}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-lg transition-all duration-300 reveal-on-scroll" style={{ '--stagger-delay': '100ms' } as React.CSSProperties}>
                    <CardContent className="p-6 text-center">
                      <img
                        src={vedMehtaNew}
                        alt={t("about.team.analyst.name")}
                        className="w-24 h-24 mx-auto mb-4 rounded-full object-cover ring-2 ring-primary/20"
                        loading="lazy"
                        decoding="async"
                        width={96}
                        height={96}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/images/team/vivaan.svg"; }}
                      />
                      <h3 className="font-heading text-lg font-semibold mb-2">
                        {t("about.team.analyst.name")}
                      </h3>
                      <p className="text-primary text-sm font-medium mb-3">
                        {t("about.team.analyst.title")}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {t("about.team.analyst.description")}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-lg transition-all duration-300 reveal-on-scroll" style={{ '--stagger-delay': '200ms' } as React.CSSProperties}>
                    <CardContent className="p-6 text-center">
                      <img
                        src={shouryaGuptaNew}
                        alt={t("about.team.reporter.name")}
                        className="w-24 h-24 mx-auto mb-4 rounded-full object-cover ring-2 ring-primary/20"
                        loading="lazy"
                        decoding="async"
                        width={96}
                        height={96}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/images/team/shaurya.svg"; }}
                      />
                      <h3 className="font-heading text-lg font-semibold mb-2">
                        {t("about.team.reporter.name")}
                      </h3>
                      <p className="text-primary text-sm font-medium mb-3">
                        {t("about.team.reporter.title")}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {t("about.team.reporter.description")}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-lg transition-all duration-300 reveal-on-scroll" style={{ '--stagger-delay': '300ms' } as React.CSSProperties}>
                    <CardContent className="p-6 text-center">
                      <img
                        src={shauryaGuptaNew}
                        alt={t("about.team.photographer.name")}
                        className="w-24 h-24 mx-auto mb-4 rounded-full object-cover ring-2 ring-primary/20"
                        loading="lazy"
                        decoding="async"
                        width={96}
                        height={96}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/images/team/shaurya.svg"; }}
                      />
                      <h3 className="font-heading text-lg font-semibold mb-2">
                        {t("about.team.photographer.name")}
                      </h3>
                      <p className="text-primary text-sm font-medium mb-3">
                        {t("about.team.photographer.title")}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {t("about.team.photographer.description")}
                      </p>
                    </CardContent>
                  </Card>
                </div>

              </div>

              <h2 className="font-heading text-2xl font-semibold mt-8 mb-4 reveal-on-scroll">
                {t("about.coverageTitle")}
              </h2>
              <ul className="space-y-2 reveal-on-scroll">
                <li><strong>{t("category.soccer")}</strong> - {t("about.footballCoverage")}</li>
                <li><strong>{t("category.basketball")}</strong> - {t("about.basketballCoverage")}</li>
                <li><strong>{t("category.baseball")}</strong> - {t("about.baseballCoverage")}</li>
                <li><strong>{t("category.tennis")}</strong> - {t("about.tennisCoverage")}</li>
                <li><strong>{t("about.olympicSports")}</strong> - {t("about.olympicCoverage")}</li>
                <li><strong>{t("about.emergingSportsTitle")}</strong> - {t("about.emergingSports")}</li>
              </ul>

              <h2 className="font-heading text-2xl font-semibold mt-8 mb-4 reveal-on-scroll">
                {t("about.valuesTitle")}
              </h2>
              <p className="reveal-on-scroll">
                {t("about.valuesText")}
              </p>
            </div >
          </div >
        </div >
      </div >
    </>
  );
};

export default About;