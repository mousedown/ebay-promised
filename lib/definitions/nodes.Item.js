/*
<?xml version="1.0" encoding="utf-8"?>
<AddItemRequest xmlns="urn:ebay:apis:eBLBaseComponents">
  <!-- Call-specific Input Fields -->
  <Item> ItemType
    <ApplicationData> string </ApplicationData>
    <AttributeArray> AttributeArrayType
      <Attribute attributeLabel="string"> AttributeType
        <Value> ValType
          <ValueLiteral> string </ValueLiteral>
        </Value>
        <!-- ... more Value nodes allowed here ... -->
      </Attribute>
      <!-- ... more Attribute nodes allowed here ... -->
    </AttributeArray>
    <AutoPay> boolean </AutoPay>
    <BestOfferDetails> BestOfferDetailsType
      <BestOfferEnabled> boolean </BestOfferEnabled>
    </BestOfferDetails>
    <BuyerRequirementDetails> BuyerRequirementDetailsType
      <LinkedPayPalAccount> boolean </LinkedPayPalAccount>
      <MaximumBuyerPolicyViolations> MaximumBuyerPolicyViolationsType
        <Count> int </Count>
        <Period> PeriodCodeType </Period>
      </MaximumBuyerPolicyViolations>
      <MaximumItemRequirements> MaximumItemRequirementsType
        <MaximumItemCount> int </MaximumItemCount>
        <MinimumFeedbackScore> int </MinimumFeedbackScore>
      </MaximumItemRequirements>
      <MaximumUnpaidItemStrikesInfo> MaximumUnpaidItemStrikesInfoType
        <Count> int </Count>
        <Period> PeriodCodeType </Period>
      </MaximumUnpaidItemStrikesInfo>
      <MinimumFeedbackScore> int </MinimumFeedbackScore>
      <ShipToRegistrationCountry> boolean </ShipToRegistrationCountry>
      <VerifiedUserRequirements> VerifiedUserRequirementsType
        <MinimumFeedbackScore> int </MinimumFeedbackScore>
        <VerifiedUser> boolean </VerifiedUser>
      </VerifiedUserRequirements>
      <ZeroFeedbackScore> boolean </ZeroFeedbackScore>
    </BuyerRequirementDetails>
    <BuyerResponsibleForShipping> boolean </BuyerResponsibleForShipping>
    <BuyItNowPrice currencyID="CurrencyCodeType"> AmountType (double) </BuyItNowPrice>
    <CategoryBasedAttributesPrefill> boolean </CategoryBasedAttributesPrefill>
    <CategoryMappingAllowed> boolean </CategoryMappingAllowed>
    <Charity> CharityType
      <CharityID> string </CharityID>
      <CharityNumber> int </CharityNumber>
      <DonationPercent> float </DonationPercent>
    </Charity>
    <ConditionDescription> string </ConditionDescription>
    <ConditionID> int </ConditionID>
    <Country> CountryCodeType </Country>
    <CrossBorderTrade> string </CrossBorderTrade>
    <!-- ... more CrossBorderTrade values allowed here ... -->
    <Currency> CurrencyCodeType </Currency>
    <Description> string </Description>
    <DigitalGoodInfo> DigitalGoodInfoType
      <DigitalDelivery> boolean </DigitalDelivery>
    </DigitalGoodInfo>
    <DisableBuyerRequirements> boolean </DisableBuyerRequirements>
    <DiscountPriceInfo> DiscountPriceInfoType
      <MadeForOutletComparisonPrice currencyID="CurrencyCodeType"> AmountType (double) </MadeForOutletComparisonPrice>
      <MinimumAdvertisedPrice currencyID="CurrencyCodeType"> AmountType (double) </MinimumAdvertisedPrice>
      <MinimumAdvertisedPriceExposure> MinimumAdvertisedPriceExposureCodeType </MinimumAdvertisedPriceExposure>
      <OriginalRetailPrice currencyID="CurrencyCodeType"> AmountType (double) </OriginalRetailPrice>
      <SoldOffeBay> boolean </SoldOffeBay>
      <SoldOneBay> boolean </SoldOneBay>
    </DiscountPriceInfo>
    <DispatchTimeMax> int </DispatchTimeMax>
    <eBayNowEligible> boolean </eBayNowEligible>
    <eBayPlus> boolean </eBayPlus>
    <ExtendedSellerContactDetails> ExtendedContactDetailsType
      <ClassifiedAdContactByEmailEnabled> boolean </ClassifiedAdContactByEmailEnabled>
      <ContactHoursDetails> ContactHoursDetailsType
        <Hours1AnyTime> boolean </Hours1AnyTime>
        <Hours1Days> DaysCodeType </Hours1Days>
        <Hours1From> time </Hours1From>
        <Hours1To> time </Hours1To>
        <Hours2AnyTime> boolean </Hours2AnyTime>
        <Hours2Days> DaysCodeType </Hours2Days>
        <Hours2From> time </Hours2From>
        <Hours2To> time </Hours2To>
        <TimeZoneID> string </TimeZoneID>
      </ContactHoursDetails>
    </ExtendedSellerContactDetails>
    <GiftIcon> int </GiftIcon>
    <GiftServices> GiftServicesCodeType </GiftServices>
    <!-- ... more GiftServices values allowed here ... -->
    <HitCounter> HitCounterCodeType </HitCounter>
    <IncludeRecommendations> boolean </IncludeRecommendations>
    <ItemCompatibilityList> ItemCompatibilityListType
      <Compatibility> ItemCompatibilityType
        <CompatibilityNotes> string </CompatibilityNotes>
        <NameValueList> NameValueListType
          <Name> string </Name>
          <Value> string </Value>
          <!-- ... more Value values allowed here ... -->
        </NameValueList>
        <!-- ... more NameValueList nodes allowed here ... -->
      </Compatibility>
      <!-- ... more Compatibility nodes allowed here ... -->
    </ItemCompatibilityList>
    <ItemSpecifics> NameValueListArrayType
      <NameValueList> NameValueListType
        <Name> string </Name>
        <Value> string </Value>
        <!-- ... more Value values allowed here ... -->
      </NameValueList>
      <!-- ... more NameValueList nodes allowed here ... -->
    </ItemSpecifics>
    <ListingCheckoutRedirectPreference> ListingCheckoutRedirectPreferenceType
      <ProStoresStoreName> string </ProStoresStoreName>
      <SellerThirdPartyUsername> string </SellerThirdPartyUsername>
    </ListingCheckoutRedirectPreference>
    <ListingDesigner> ListingDesignerType
      <LayoutID> int </LayoutID>
      <OptimalPictureSize> boolean </OptimalPictureSize>
      <ThemeID> int </ThemeID>
    </ListingDesigner>
    <ListingDetails> ListingDetailsType
      <BestOfferAutoAcceptPrice currencyID="CurrencyCodeType"> AmountType (double) </BestOfferAutoAcceptPrice>
      <LocalListingDistance> string </LocalListingDistance>
      <MinimumBestOfferPrice currencyID="CurrencyCodeType"> AmountType (double) </MinimumBestOfferPrice>
    </ListingDetails>
    <ListingDuration> token </ListingDuration>
    <ListingEnhancement> ListingEnhancementsCodeType </ListingEnhancement>
    <!-- ... more ListingEnhancement values allowed here ... -->
    <ListingSubtype2> ListingSubtypeCodeType </ListingSubtype2>
    <ListingType> ListingTypeCodeType </ListingType>
    <LiveAuction> boolean </LiveAuction>
    <Location> string </Location>
    <LotSize> int </LotSize>
    <MotorsGermanySearchable> boolean </MotorsGermanySearchable>
    <PaymentDetails> PaymentDetailsType
      <DaysToFullPayment> int </DaysToFullPayment>
      <DepositAmount currencyID="CurrencyCodeType"> AmountType (double) </DepositAmount>
      <DepositType> DepositTypeCodeType </DepositType>
      <HoursToDeposit> int </HoursToDeposit>
    </PaymentDetails>
    <PaymentMethods> BuyerPaymentMethodCodeType </PaymentMethods>
    <!-- ... more PaymentMethods values allowed here ... -->
    <PayPalEmailAddress> string </PayPalEmailAddress>
    <PickupInStoreDetails> PickupInStoreDetailsType
      <EligibleForPickupDropOff> boolean </EligibleForPickupDropOff>
      <EligibleForPickupInStore> boolean </EligibleForPickupInStore>
    </PickupInStoreDetails>
    <PictureDetails> PictureDetailsType
      <GalleryDuration> token </GalleryDuration>
      <GalleryType> GalleryTypeCodeType </GalleryType>
      <GalleryURL> anyURI </GalleryURL>
      <PhotoDisplay> PhotoDisplayCodeType </PhotoDisplay>
      <PictureURL> anyURI </PictureURL>
      <!-- ... more PictureURL values allowed here ... -->
    </PictureDetails>
    <PostalCode> string </PostalCode>
    <PostCheckoutExperienceEnabled> boolean </PostCheckoutExperienceEnabled>
    <PrimaryCategory> CategoryType
      <CategoryID> string </CategoryID>
    </PrimaryCategory>
    <PrivateListing> boolean </PrivateListing>
    <ProductListingDetails> ProductListingDetailsType
      <BrandMPN> BrandMPNType
        <Brand> string </Brand>
        <MPN> string </MPN>
      </BrandMPN>
      <EAN> string </EAN>
      <IncludeeBayProductDetails> boolean </IncludeeBayProductDetails>
      <IncludeStockPhotoURL> boolean </IncludeStockPhotoURL>
      <ISBN> string </ISBN>
      <ProductReferenceID> string </ProductReferenceID>
      <ReturnSearchResultOnDuplicates> boolean </ReturnSearchResultOnDuplicates>
      <TicketListingDetails> TicketListingDetailsType
        <EventTitle> string </EventTitle>
        <PrintedDate> string </PrintedDate>
        <PrintedTime> string </PrintedTime>
        <Venue> string </Venue>
      </TicketListingDetails>
      <UPC> string </UPC>
      <UseFirstProduct> boolean </UseFirstProduct>
      <UseStockPhotoURLAsGallery> boolean </UseStockPhotoURLAsGallery>
    </ProductListingDetails>
    <Quantity> int </Quantity>
    <QuantityInfo> QuantityInfoType
      <MinimumRemnantSet> int </MinimumRemnantSet>
    </QuantityInfo>
    <ReservePrice currencyID="CurrencyCodeType"> AmountType (double) </ReservePrice>
    <ReturnPolicy> ReturnPolicyType
      <Description> string </Description>
      <EAN> string </EAN>
      <ExtendedHolidayReturns> boolean </ExtendedHolidayReturns>
      <RefundOption> token </RefundOption>
      <RestockingFeeValueOption> token </RestockingFeeValueOption>
      <ReturnsAcceptedOption> token </ReturnsAcceptedOption>
      <ReturnsWithinOption> token </ReturnsWithinOption>
      <ShippingCostPaidByOption> token </ShippingCostPaidByOption>
      <WarrantyDurationOption> token </WarrantyDurationOption>
      <WarrantyOfferedOption> token </WarrantyOfferedOption>
      <WarrantyTypeOption> token </WarrantyTypeOption>
    </ReturnPolicy>
    <ScheduleTime> dateTime </ScheduleTime>
    <SecondaryCategory> CategoryType
      <CategoryID> string </CategoryID>
    </SecondaryCategory>
    <Seller> UserType
      <MotorsDealer> boolean </MotorsDealer>
    </Seller>
    <SellerContactDetails> AddressType
      <CompanyName> string </CompanyName>
      <County> string </County>
      <Phone2AreaOrCityCode> string </Phone2AreaOrCityCode>
      <Phone2CountryCode> CountryCodeType </Phone2CountryCode>
      <Phone2LocalNumber> string </Phone2LocalNumber>
      <PhoneAreaOrCityCode> string </PhoneAreaOrCityCode>
      <PhoneCountryCode> CountryCodeType </PhoneCountryCode>
      <PhoneLocalNumber> string </PhoneLocalNumber>
      <Street> string </Street>
      <Street2> string </Street2>
    </SellerContactDetails>
    <SellerInventoryID> string </SellerInventoryID>
    <SellerProfiles> SellerProfilesType
      <SellerPaymentProfile> SellerPaymentProfileType
        <PaymentProfileID> long </PaymentProfileID>
        <PaymentProfileName> string </PaymentProfileName>
      </SellerPaymentProfile>
      <SellerReturnProfile> SellerReturnProfileType
        <ReturnProfileID> long </ReturnProfileID>
        <ReturnProfileName> string </ReturnProfileName>
      </SellerReturnProfile>
      <SellerShippingProfile> SellerShippingProfileType
        <ShippingProfileID> long </ShippingProfileID>
        <ShippingProfileName> string </ShippingProfileName>
      </SellerShippingProfile>
    </SellerProfiles>
    <SellerProvidedTitle> string </SellerProvidedTitle>
    <ShippingDetails> ShippingDetailsType
      <CalculatedShippingRate> CalculatedShippingRateType
        <InternationalPackagingHandlingCosts currencyID="CurrencyCodeType"> AmountType (double) </InternationalPackagingHandlingCosts>
        <MeasurementUnit> MeasurementSystemCodeType </MeasurementUnit>
        <OriginatingPostalCode> string </OriginatingPostalCode>
        <PackageDepth unit="token" measurementSystem="MeasurementSystemCodeType"> MeasureType (decimal) </PackageDepth>
        <PackageLength unit="token" measurementSystem="MeasurementSystemCodeType"> MeasureType (decimal) </PackageLength>
        <PackageWidth unit="token" measurementSystem="MeasurementSystemCodeType"> MeasureType (decimal) </PackageWidth>
        <PackagingHandlingCosts currencyID="CurrencyCodeType"> AmountType (double) </PackagingHandlingCosts>
        <ShippingIrregular> boolean </ShippingIrregular>
        <ShippingPackage> ShippingPackageCodeType </ShippingPackage>
        <WeightMajor unit="token" measurementSystem="MeasurementSystemCodeType"> MeasureType (decimal) </WeightMajor>
        <WeightMinor unit="token" measurementSystem="MeasurementSystemCodeType"> MeasureType (decimal) </WeightMinor>
      </CalculatedShippingRate>
      <CODCost currencyID="CurrencyCodeType"> AmountType (double) </CODCost>
      <ExcludeShipToLocation> string </ExcludeShipToLocation>
      <!-- ... more ExcludeShipToLocation values allowed here ... -->
      <GlobalShipping> boolean </GlobalShipping>
      <InsuranceDetails> InsuranceDetailsType
        <InsuranceFee currencyID="CurrencyCodeType"> AmountType (double) </InsuranceFee>
        <InsuranceOption> InsuranceOptionCodeType </InsuranceOption>
      </InsuranceDetails>
      <InsuranceFee currencyID="CurrencyCodeType"> AmountType (double) </InsuranceFee>
      <InsuranceOption> InsuranceOptionCodeType </InsuranceOption>
      <InternationalInsuranceDetails> InsuranceDetailsType
        <InsuranceFee currencyID="CurrencyCodeType"> AmountType (double) </InsuranceFee>
        <InsuranceOption> InsuranceOptionCodeType </InsuranceOption>
      </InternationalInsuranceDetails>
      <InternationalPromotionalShippingDiscount> boolean </InternationalPromotionalShippingDiscount>
      <InternationalShippingDiscountProfileID> string </InternationalShippingDiscountProfileID>
      <InternationalShippingServiceOption> InternationalShippingServiceOptionsType
        <ShippingService> token </ShippingService>
        <ShippingServiceAdditionalCost currencyID="CurrencyCodeType"> AmountType (double) </ShippingServiceAdditionalCost>
        <ShippingServiceCost currencyID="CurrencyCodeType"> AmountType (double) </ShippingServiceCost>
        <ShippingServicePriority> int </ShippingServicePriority>
        <ShipToLocation> string </ShipToLocation>
        <!-- ... more ShipToLocation values allowed here ... -->
      </InternationalShippingServiceOption>
      <!-- ... more InternationalShippingServiceOption nodes allowed here ... -->
      <PaymentInstructions> string </PaymentInstructions>
      <PromotionalShippingDiscount> boolean </PromotionalShippingDiscount>
      <RateTableDetails> RateTableDetailsType
        <DomesticRateTable> string </DomesticRateTable>
        <InternationalRateTable> string </InternationalRateTable>
      </RateTableDetails>
      <SalesTax> SalesTaxType
        <SalesTaxPercent> float </SalesTaxPercent>
        <SalesTaxState> string </SalesTaxState>
        <ShippingIncludedInTax> boolean </ShippingIncludedInTax>
      </SalesTax>
      <ShippingDiscountProfileID> string </ShippingDiscountProfileID>
      <ShippingServiceOptions> ShippingServiceOptionsType
        <FreeShipping> boolean </FreeShipping>
        <ShippingService> token </ShippingService>
        <ShippingServiceAdditionalCost currencyID="CurrencyCodeType"> AmountType (double) </ShippingServiceAdditionalCost>
        <ShippingServiceCost currencyID="CurrencyCodeType"> AmountType (double) </ShippingServiceCost>
        <ShippingServicePriority> int </ShippingServicePriority>
        <ShippingSurcharge currencyID="CurrencyCodeType"> AmountType (double) </ShippingSurcharge>
      </ShippingServiceOptions>
      <!-- ... more ShippingServiceOptions nodes allowed here ... -->
      <ShippingType> ShippingTypeCodeType </ShippingType>
    </ShippingDetails>
    <ShippingPackageDetails> ShipPackageDetailsType
      <MeasurementUnit> MeasurementSystemCodeType </MeasurementUnit>
      <PackageDepth unit="token" measurementSystem="MeasurementSystemCodeType"> MeasureType (decimal) </PackageDepth>
      <PackageLength unit="token" measurementSystem="MeasurementSystemCodeType"> MeasureType (decimal) </PackageLength>
      <PackageWidth unit="token" measurementSystem="MeasurementSystemCodeType"> MeasureType (decimal) </PackageWidth>
      <ShippingIrregular> boolean </ShippingIrregular>
      <ShippingPackage> ShippingPackageCodeType </ShippingPackage>
      <WeightMajor unit="token" measurementSystem="MeasurementSystemCodeType"> MeasureType (decimal) </WeightMajor>
      <WeightMinor unit="token" measurementSystem="MeasurementSystemCodeType"> MeasureType (decimal) </WeightMinor>
    </ShippingPackageDetails>
    <ShippingServiceCostOverrideList> ShippingServiceCostOverrideListType
      <ShippingServiceCostOverride> ShippingServiceCostOverrideType
        <ShippingServiceAdditionalCost currencyID="CurrencyCodeType"> AmountType (double) </ShippingServiceAdditionalCost>
        <ShippingServiceCost currencyID="CurrencyCodeType"> AmountType (double) </ShippingServiceCost>
        <ShippingServicePriority> int </ShippingServicePriority>
        <ShippingServiceType> ShippingServiceType </ShippingServiceType>
        <ShippingSurcharge currencyID="CurrencyCodeType"> AmountType (double) </ShippingSurcharge>
      </ShippingServiceCostOverride>
      <!-- ... more ShippingServiceCostOverride nodes allowed here ... -->
    </ShippingServiceCostOverrideList>
    <ShippingTermsInDescription> boolean </ShippingTermsInDescription>
    <ShipToLocations> string </ShipToLocations>
    <!-- ... more ShipToLocations values allowed here ... -->
    <Site> SiteCodeType </Site>
    <SKU> SKUType (string) </SKU>
    <SkypeContactOption> SkypeContactOptionCodeType </SkypeContactOption>
    <!-- ... more SkypeContactOption values allowed here ... -->
    <SkypeEnabled> boolean </SkypeEnabled>
    <SkypeID> string </SkypeID>
    <StartPrice currencyID="CurrencyCodeType"> AmountType (double) </StartPrice>
    <Storefront> StorefrontType
      <StoreCategory2ID> long </StoreCategory2ID>
      <StoreCategory2Name> string </StoreCategory2Name>
      <StoreCategoryID> long </StoreCategoryID>
      <StoreCategoryName> string </StoreCategoryName>
    </Storefront>
    <SubTitle> string </SubTitle>
    <TaxCategory> string </TaxCategory>
    <ThirdPartyCheckout> boolean </ThirdPartyCheckout>
    <ThirdPartyCheckoutIntegration> boolean </ThirdPartyCheckoutIntegration>
    <Title> string </Title>
    <UseRecommendedProduct> boolean </UseRecommendedProduct>
    <UseTaxTable> boolean </UseTaxTable>
    <UUID> UUIDType (string) </UUID>
    <VATDetails> VATDetailsType
      <BusinessSeller> boolean </BusinessSeller>
      <RestrictedToBusiness> boolean </RestrictedToBusiness>
      <VATPercent> float </VATPercent>
    </VATDetails>
    <VIN> string </VIN>
    <VRM> string </VRM>
  </Item>
  <!-- Standard Input Fields -->
  <ErrorHandling> ErrorHandlingCodeType </ErrorHandling>
  <ErrorLanguage> string </ErrorLanguage>
  <MessageID> string </MessageID>
  <Version> string </Version>
  <WarningLevel> WarningLevelCodeType </WarningLevel>
</AddItemRequest>
*/
"use strict";
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9kZWZpbml0aW9ucy9ub2Rlcy5JdGVtLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6Im5vZGVzLkl0ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuPD94bWwgdmVyc2lvbj1cIjEuMFwiIGVuY29kaW5nPVwidXRmLThcIj8+XG48QWRkSXRlbVJlcXVlc3QgeG1sbnM9XCJ1cm46ZWJheTphcGlzOmVCTEJhc2VDb21wb25lbnRzXCI+XG4gIDwhLS0gQ2FsbC1zcGVjaWZpYyBJbnB1dCBGaWVsZHMgLS0+XG4gIDxJdGVtPiBJdGVtVHlwZVxuICAgIDxBcHBsaWNhdGlvbkRhdGE+IHN0cmluZyA8L0FwcGxpY2F0aW9uRGF0YT5cbiAgICA8QXR0cmlidXRlQXJyYXk+IEF0dHJpYnV0ZUFycmF5VHlwZVxuICAgICAgPEF0dHJpYnV0ZSBhdHRyaWJ1dGVMYWJlbD1cInN0cmluZ1wiPiBBdHRyaWJ1dGVUeXBlXG4gICAgICAgIDxWYWx1ZT4gVmFsVHlwZVxuICAgICAgICAgIDxWYWx1ZUxpdGVyYWw+IHN0cmluZyA8L1ZhbHVlTGl0ZXJhbD5cbiAgICAgICAgPC9WYWx1ZT5cbiAgICAgICAgPCEtLSAuLi4gbW9yZSBWYWx1ZSBub2RlcyBhbGxvd2VkIGhlcmUgLi4uIC0tPlxuICAgICAgPC9BdHRyaWJ1dGU+XG4gICAgICA8IS0tIC4uLiBtb3JlIEF0dHJpYnV0ZSBub2RlcyBhbGxvd2VkIGhlcmUgLi4uIC0tPlxuICAgIDwvQXR0cmlidXRlQXJyYXk+XG4gICAgPEF1dG9QYXk+IGJvb2xlYW4gPC9BdXRvUGF5PlxuICAgIDxCZXN0T2ZmZXJEZXRhaWxzPiBCZXN0T2ZmZXJEZXRhaWxzVHlwZVxuICAgICAgPEJlc3RPZmZlckVuYWJsZWQ+IGJvb2xlYW4gPC9CZXN0T2ZmZXJFbmFibGVkPlxuICAgIDwvQmVzdE9mZmVyRGV0YWlscz5cbiAgICA8QnV5ZXJSZXF1aXJlbWVudERldGFpbHM+IEJ1eWVyUmVxdWlyZW1lbnREZXRhaWxzVHlwZVxuICAgICAgPExpbmtlZFBheVBhbEFjY291bnQ+IGJvb2xlYW4gPC9MaW5rZWRQYXlQYWxBY2NvdW50PlxuICAgICAgPE1heGltdW1CdXllclBvbGljeVZpb2xhdGlvbnM+IE1heGltdW1CdXllclBvbGljeVZpb2xhdGlvbnNUeXBlXG4gICAgICAgIDxDb3VudD4gaW50IDwvQ291bnQ+XG4gICAgICAgIDxQZXJpb2Q+IFBlcmlvZENvZGVUeXBlIDwvUGVyaW9kPlxuICAgICAgPC9NYXhpbXVtQnV5ZXJQb2xpY3lWaW9sYXRpb25zPlxuICAgICAgPE1heGltdW1JdGVtUmVxdWlyZW1lbnRzPiBNYXhpbXVtSXRlbVJlcXVpcmVtZW50c1R5cGVcbiAgICAgICAgPE1heGltdW1JdGVtQ291bnQ+IGludCA8L01heGltdW1JdGVtQ291bnQ+XG4gICAgICAgIDxNaW5pbXVtRmVlZGJhY2tTY29yZT4gaW50IDwvTWluaW11bUZlZWRiYWNrU2NvcmU+XG4gICAgICA8L01heGltdW1JdGVtUmVxdWlyZW1lbnRzPlxuICAgICAgPE1heGltdW1VbnBhaWRJdGVtU3RyaWtlc0luZm8+IE1heGltdW1VbnBhaWRJdGVtU3RyaWtlc0luZm9UeXBlXG4gICAgICAgIDxDb3VudD4gaW50IDwvQ291bnQ+XG4gICAgICAgIDxQZXJpb2Q+IFBlcmlvZENvZGVUeXBlIDwvUGVyaW9kPlxuICAgICAgPC9NYXhpbXVtVW5wYWlkSXRlbVN0cmlrZXNJbmZvPlxuICAgICAgPE1pbmltdW1GZWVkYmFja1Njb3JlPiBpbnQgPC9NaW5pbXVtRmVlZGJhY2tTY29yZT5cbiAgICAgIDxTaGlwVG9SZWdpc3RyYXRpb25Db3VudHJ5PiBib29sZWFuIDwvU2hpcFRvUmVnaXN0cmF0aW9uQ291bnRyeT5cbiAgICAgIDxWZXJpZmllZFVzZXJSZXF1aXJlbWVudHM+IFZlcmlmaWVkVXNlclJlcXVpcmVtZW50c1R5cGVcbiAgICAgICAgPE1pbmltdW1GZWVkYmFja1Njb3JlPiBpbnQgPC9NaW5pbXVtRmVlZGJhY2tTY29yZT5cbiAgICAgICAgPFZlcmlmaWVkVXNlcj4gYm9vbGVhbiA8L1ZlcmlmaWVkVXNlcj5cbiAgICAgIDwvVmVyaWZpZWRVc2VyUmVxdWlyZW1lbnRzPlxuICAgICAgPFplcm9GZWVkYmFja1Njb3JlPiBib29sZWFuIDwvWmVyb0ZlZWRiYWNrU2NvcmU+XG4gICAgPC9CdXllclJlcXVpcmVtZW50RGV0YWlscz5cbiAgICA8QnV5ZXJSZXNwb25zaWJsZUZvclNoaXBwaW5nPiBib29sZWFuIDwvQnV5ZXJSZXNwb25zaWJsZUZvclNoaXBwaW5nPlxuICAgIDxCdXlJdE5vd1ByaWNlIGN1cnJlbmN5SUQ9XCJDdXJyZW5jeUNvZGVUeXBlXCI+IEFtb3VudFR5cGUgKGRvdWJsZSkgPC9CdXlJdE5vd1ByaWNlPlxuICAgIDxDYXRlZ29yeUJhc2VkQXR0cmlidXRlc1ByZWZpbGw+IGJvb2xlYW4gPC9DYXRlZ29yeUJhc2VkQXR0cmlidXRlc1ByZWZpbGw+XG4gICAgPENhdGVnb3J5TWFwcGluZ0FsbG93ZWQ+IGJvb2xlYW4gPC9DYXRlZ29yeU1hcHBpbmdBbGxvd2VkPlxuICAgIDxDaGFyaXR5PiBDaGFyaXR5VHlwZVxuICAgICAgPENoYXJpdHlJRD4gc3RyaW5nIDwvQ2hhcml0eUlEPlxuICAgICAgPENoYXJpdHlOdW1iZXI+IGludCA8L0NoYXJpdHlOdW1iZXI+XG4gICAgICA8RG9uYXRpb25QZXJjZW50PiBmbG9hdCA8L0RvbmF0aW9uUGVyY2VudD5cbiAgICA8L0NoYXJpdHk+XG4gICAgPENvbmRpdGlvbkRlc2NyaXB0aW9uPiBzdHJpbmcgPC9Db25kaXRpb25EZXNjcmlwdGlvbj5cbiAgICA8Q29uZGl0aW9uSUQ+IGludCA8L0NvbmRpdGlvbklEPlxuICAgIDxDb3VudHJ5PiBDb3VudHJ5Q29kZVR5cGUgPC9Db3VudHJ5PlxuICAgIDxDcm9zc0JvcmRlclRyYWRlPiBzdHJpbmcgPC9Dcm9zc0JvcmRlclRyYWRlPlxuICAgIDwhLS0gLi4uIG1vcmUgQ3Jvc3NCb3JkZXJUcmFkZSB2YWx1ZXMgYWxsb3dlZCBoZXJlIC4uLiAtLT5cbiAgICA8Q3VycmVuY3k+IEN1cnJlbmN5Q29kZVR5cGUgPC9DdXJyZW5jeT5cbiAgICA8RGVzY3JpcHRpb24+IHN0cmluZyA8L0Rlc2NyaXB0aW9uPlxuICAgIDxEaWdpdGFsR29vZEluZm8+IERpZ2l0YWxHb29kSW5mb1R5cGVcbiAgICAgIDxEaWdpdGFsRGVsaXZlcnk+IGJvb2xlYW4gPC9EaWdpdGFsRGVsaXZlcnk+XG4gICAgPC9EaWdpdGFsR29vZEluZm8+XG4gICAgPERpc2FibGVCdXllclJlcXVpcmVtZW50cz4gYm9vbGVhbiA8L0Rpc2FibGVCdXllclJlcXVpcmVtZW50cz5cbiAgICA8RGlzY291bnRQcmljZUluZm8+IERpc2NvdW50UHJpY2VJbmZvVHlwZVxuICAgICAgPE1hZGVGb3JPdXRsZXRDb21wYXJpc29uUHJpY2UgY3VycmVuY3lJRD1cIkN1cnJlbmN5Q29kZVR5cGVcIj4gQW1vdW50VHlwZSAoZG91YmxlKSA8L01hZGVGb3JPdXRsZXRDb21wYXJpc29uUHJpY2U+XG4gICAgICA8TWluaW11bUFkdmVydGlzZWRQcmljZSBjdXJyZW5jeUlEPVwiQ3VycmVuY3lDb2RlVHlwZVwiPiBBbW91bnRUeXBlIChkb3VibGUpIDwvTWluaW11bUFkdmVydGlzZWRQcmljZT5cbiAgICAgIDxNaW5pbXVtQWR2ZXJ0aXNlZFByaWNlRXhwb3N1cmU+IE1pbmltdW1BZHZlcnRpc2VkUHJpY2VFeHBvc3VyZUNvZGVUeXBlIDwvTWluaW11bUFkdmVydGlzZWRQcmljZUV4cG9zdXJlPlxuICAgICAgPE9yaWdpbmFsUmV0YWlsUHJpY2UgY3VycmVuY3lJRD1cIkN1cnJlbmN5Q29kZVR5cGVcIj4gQW1vdW50VHlwZSAoZG91YmxlKSA8L09yaWdpbmFsUmV0YWlsUHJpY2U+XG4gICAgICA8U29sZE9mZmVCYXk+IGJvb2xlYW4gPC9Tb2xkT2ZmZUJheT5cbiAgICAgIDxTb2xkT25lQmF5PiBib29sZWFuIDwvU29sZE9uZUJheT5cbiAgICA8L0Rpc2NvdW50UHJpY2VJbmZvPlxuICAgIDxEaXNwYXRjaFRpbWVNYXg+IGludCA8L0Rpc3BhdGNoVGltZU1heD5cbiAgICA8ZUJheU5vd0VsaWdpYmxlPiBib29sZWFuIDwvZUJheU5vd0VsaWdpYmxlPlxuICAgIDxlQmF5UGx1cz4gYm9vbGVhbiA8L2VCYXlQbHVzPlxuICAgIDxFeHRlbmRlZFNlbGxlckNvbnRhY3REZXRhaWxzPiBFeHRlbmRlZENvbnRhY3REZXRhaWxzVHlwZVxuICAgICAgPENsYXNzaWZpZWRBZENvbnRhY3RCeUVtYWlsRW5hYmxlZD4gYm9vbGVhbiA8L0NsYXNzaWZpZWRBZENvbnRhY3RCeUVtYWlsRW5hYmxlZD5cbiAgICAgIDxDb250YWN0SG91cnNEZXRhaWxzPiBDb250YWN0SG91cnNEZXRhaWxzVHlwZVxuICAgICAgICA8SG91cnMxQW55VGltZT4gYm9vbGVhbiA8L0hvdXJzMUFueVRpbWU+XG4gICAgICAgIDxIb3VyczFEYXlzPiBEYXlzQ29kZVR5cGUgPC9Ib3VyczFEYXlzPlxuICAgICAgICA8SG91cnMxRnJvbT4gdGltZSA8L0hvdXJzMUZyb20+XG4gICAgICAgIDxIb3VyczFUbz4gdGltZSA8L0hvdXJzMVRvPlxuICAgICAgICA8SG91cnMyQW55VGltZT4gYm9vbGVhbiA8L0hvdXJzMkFueVRpbWU+XG4gICAgICAgIDxIb3VyczJEYXlzPiBEYXlzQ29kZVR5cGUgPC9Ib3VyczJEYXlzPlxuICAgICAgICA8SG91cnMyRnJvbT4gdGltZSA8L0hvdXJzMkZyb20+XG4gICAgICAgIDxIb3VyczJUbz4gdGltZSA8L0hvdXJzMlRvPlxuICAgICAgICA8VGltZVpvbmVJRD4gc3RyaW5nIDwvVGltZVpvbmVJRD5cbiAgICAgIDwvQ29udGFjdEhvdXJzRGV0YWlscz5cbiAgICA8L0V4dGVuZGVkU2VsbGVyQ29udGFjdERldGFpbHM+XG4gICAgPEdpZnRJY29uPiBpbnQgPC9HaWZ0SWNvbj5cbiAgICA8R2lmdFNlcnZpY2VzPiBHaWZ0U2VydmljZXNDb2RlVHlwZSA8L0dpZnRTZXJ2aWNlcz5cbiAgICA8IS0tIC4uLiBtb3JlIEdpZnRTZXJ2aWNlcyB2YWx1ZXMgYWxsb3dlZCBoZXJlIC4uLiAtLT5cbiAgICA8SGl0Q291bnRlcj4gSGl0Q291bnRlckNvZGVUeXBlIDwvSGl0Q291bnRlcj5cbiAgICA8SW5jbHVkZVJlY29tbWVuZGF0aW9ucz4gYm9vbGVhbiA8L0luY2x1ZGVSZWNvbW1lbmRhdGlvbnM+XG4gICAgPEl0ZW1Db21wYXRpYmlsaXR5TGlzdD4gSXRlbUNvbXBhdGliaWxpdHlMaXN0VHlwZVxuICAgICAgPENvbXBhdGliaWxpdHk+IEl0ZW1Db21wYXRpYmlsaXR5VHlwZVxuICAgICAgICA8Q29tcGF0aWJpbGl0eU5vdGVzPiBzdHJpbmcgPC9Db21wYXRpYmlsaXR5Tm90ZXM+XG4gICAgICAgIDxOYW1lVmFsdWVMaXN0PiBOYW1lVmFsdWVMaXN0VHlwZVxuICAgICAgICAgIDxOYW1lPiBzdHJpbmcgPC9OYW1lPlxuICAgICAgICAgIDxWYWx1ZT4gc3RyaW5nIDwvVmFsdWU+XG4gICAgICAgICAgPCEtLSAuLi4gbW9yZSBWYWx1ZSB2YWx1ZXMgYWxsb3dlZCBoZXJlIC4uLiAtLT5cbiAgICAgICAgPC9OYW1lVmFsdWVMaXN0PlxuICAgICAgICA8IS0tIC4uLiBtb3JlIE5hbWVWYWx1ZUxpc3Qgbm9kZXMgYWxsb3dlZCBoZXJlIC4uLiAtLT5cbiAgICAgIDwvQ29tcGF0aWJpbGl0eT5cbiAgICAgIDwhLS0gLi4uIG1vcmUgQ29tcGF0aWJpbGl0eSBub2RlcyBhbGxvd2VkIGhlcmUgLi4uIC0tPlxuICAgIDwvSXRlbUNvbXBhdGliaWxpdHlMaXN0PlxuICAgIDxJdGVtU3BlY2lmaWNzPiBOYW1lVmFsdWVMaXN0QXJyYXlUeXBlXG4gICAgICA8TmFtZVZhbHVlTGlzdD4gTmFtZVZhbHVlTGlzdFR5cGVcbiAgICAgICAgPE5hbWU+IHN0cmluZyA8L05hbWU+XG4gICAgICAgIDxWYWx1ZT4gc3RyaW5nIDwvVmFsdWU+XG4gICAgICAgIDwhLS0gLi4uIG1vcmUgVmFsdWUgdmFsdWVzIGFsbG93ZWQgaGVyZSAuLi4gLS0+XG4gICAgICA8L05hbWVWYWx1ZUxpc3Q+XG4gICAgICA8IS0tIC4uLiBtb3JlIE5hbWVWYWx1ZUxpc3Qgbm9kZXMgYWxsb3dlZCBoZXJlIC4uLiAtLT5cbiAgICA8L0l0ZW1TcGVjaWZpY3M+XG4gICAgPExpc3RpbmdDaGVja291dFJlZGlyZWN0UHJlZmVyZW5jZT4gTGlzdGluZ0NoZWNrb3V0UmVkaXJlY3RQcmVmZXJlbmNlVHlwZVxuICAgICAgPFByb1N0b3Jlc1N0b3JlTmFtZT4gc3RyaW5nIDwvUHJvU3RvcmVzU3RvcmVOYW1lPlxuICAgICAgPFNlbGxlclRoaXJkUGFydHlVc2VybmFtZT4gc3RyaW5nIDwvU2VsbGVyVGhpcmRQYXJ0eVVzZXJuYW1lPlxuICAgIDwvTGlzdGluZ0NoZWNrb3V0UmVkaXJlY3RQcmVmZXJlbmNlPlxuICAgIDxMaXN0aW5nRGVzaWduZXI+IExpc3RpbmdEZXNpZ25lclR5cGVcbiAgICAgIDxMYXlvdXRJRD4gaW50IDwvTGF5b3V0SUQ+XG4gICAgICA8T3B0aW1hbFBpY3R1cmVTaXplPiBib29sZWFuIDwvT3B0aW1hbFBpY3R1cmVTaXplPlxuICAgICAgPFRoZW1lSUQ+IGludCA8L1RoZW1lSUQ+XG4gICAgPC9MaXN0aW5nRGVzaWduZXI+XG4gICAgPExpc3RpbmdEZXRhaWxzPiBMaXN0aW5nRGV0YWlsc1R5cGVcbiAgICAgIDxCZXN0T2ZmZXJBdXRvQWNjZXB0UHJpY2UgY3VycmVuY3lJRD1cIkN1cnJlbmN5Q29kZVR5cGVcIj4gQW1vdW50VHlwZSAoZG91YmxlKSA8L0Jlc3RPZmZlckF1dG9BY2NlcHRQcmljZT5cbiAgICAgIDxMb2NhbExpc3RpbmdEaXN0YW5jZT4gc3RyaW5nIDwvTG9jYWxMaXN0aW5nRGlzdGFuY2U+XG4gICAgICA8TWluaW11bUJlc3RPZmZlclByaWNlIGN1cnJlbmN5SUQ9XCJDdXJyZW5jeUNvZGVUeXBlXCI+IEFtb3VudFR5cGUgKGRvdWJsZSkgPC9NaW5pbXVtQmVzdE9mZmVyUHJpY2U+XG4gICAgPC9MaXN0aW5nRGV0YWlscz5cbiAgICA8TGlzdGluZ0R1cmF0aW9uPiB0b2tlbiA8L0xpc3RpbmdEdXJhdGlvbj5cbiAgICA8TGlzdGluZ0VuaGFuY2VtZW50PiBMaXN0aW5nRW5oYW5jZW1lbnRzQ29kZVR5cGUgPC9MaXN0aW5nRW5oYW5jZW1lbnQ+XG4gICAgPCEtLSAuLi4gbW9yZSBMaXN0aW5nRW5oYW5jZW1lbnQgdmFsdWVzIGFsbG93ZWQgaGVyZSAuLi4gLS0+XG4gICAgPExpc3RpbmdTdWJ0eXBlMj4gTGlzdGluZ1N1YnR5cGVDb2RlVHlwZSA8L0xpc3RpbmdTdWJ0eXBlMj5cbiAgICA8TGlzdGluZ1R5cGU+IExpc3RpbmdUeXBlQ29kZVR5cGUgPC9MaXN0aW5nVHlwZT5cbiAgICA8TGl2ZUF1Y3Rpb24+IGJvb2xlYW4gPC9MaXZlQXVjdGlvbj5cbiAgICA8TG9jYXRpb24+IHN0cmluZyA8L0xvY2F0aW9uPlxuICAgIDxMb3RTaXplPiBpbnQgPC9Mb3RTaXplPlxuICAgIDxNb3RvcnNHZXJtYW55U2VhcmNoYWJsZT4gYm9vbGVhbiA8L01vdG9yc0dlcm1hbnlTZWFyY2hhYmxlPlxuICAgIDxQYXltZW50RGV0YWlscz4gUGF5bWVudERldGFpbHNUeXBlXG4gICAgICA8RGF5c1RvRnVsbFBheW1lbnQ+IGludCA8L0RheXNUb0Z1bGxQYXltZW50PlxuICAgICAgPERlcG9zaXRBbW91bnQgY3VycmVuY3lJRD1cIkN1cnJlbmN5Q29kZVR5cGVcIj4gQW1vdW50VHlwZSAoZG91YmxlKSA8L0RlcG9zaXRBbW91bnQ+XG4gICAgICA8RGVwb3NpdFR5cGU+IERlcG9zaXRUeXBlQ29kZVR5cGUgPC9EZXBvc2l0VHlwZT5cbiAgICAgIDxIb3Vyc1RvRGVwb3NpdD4gaW50IDwvSG91cnNUb0RlcG9zaXQ+XG4gICAgPC9QYXltZW50RGV0YWlscz5cbiAgICA8UGF5bWVudE1ldGhvZHM+IEJ1eWVyUGF5bWVudE1ldGhvZENvZGVUeXBlIDwvUGF5bWVudE1ldGhvZHM+XG4gICAgPCEtLSAuLi4gbW9yZSBQYXltZW50TWV0aG9kcyB2YWx1ZXMgYWxsb3dlZCBoZXJlIC4uLiAtLT5cbiAgICA8UGF5UGFsRW1haWxBZGRyZXNzPiBzdHJpbmcgPC9QYXlQYWxFbWFpbEFkZHJlc3M+XG4gICAgPFBpY2t1cEluU3RvcmVEZXRhaWxzPiBQaWNrdXBJblN0b3JlRGV0YWlsc1R5cGVcbiAgICAgIDxFbGlnaWJsZUZvclBpY2t1cERyb3BPZmY+IGJvb2xlYW4gPC9FbGlnaWJsZUZvclBpY2t1cERyb3BPZmY+XG4gICAgICA8RWxpZ2libGVGb3JQaWNrdXBJblN0b3JlPiBib29sZWFuIDwvRWxpZ2libGVGb3JQaWNrdXBJblN0b3JlPlxuICAgIDwvUGlja3VwSW5TdG9yZURldGFpbHM+XG4gICAgPFBpY3R1cmVEZXRhaWxzPiBQaWN0dXJlRGV0YWlsc1R5cGVcbiAgICAgIDxHYWxsZXJ5RHVyYXRpb24+IHRva2VuIDwvR2FsbGVyeUR1cmF0aW9uPlxuICAgICAgPEdhbGxlcnlUeXBlPiBHYWxsZXJ5VHlwZUNvZGVUeXBlIDwvR2FsbGVyeVR5cGU+XG4gICAgICA8R2FsbGVyeVVSTD4gYW55VVJJIDwvR2FsbGVyeVVSTD5cbiAgICAgIDxQaG90b0Rpc3BsYXk+IFBob3RvRGlzcGxheUNvZGVUeXBlIDwvUGhvdG9EaXNwbGF5PlxuICAgICAgPFBpY3R1cmVVUkw+IGFueVVSSSA8L1BpY3R1cmVVUkw+XG4gICAgICA8IS0tIC4uLiBtb3JlIFBpY3R1cmVVUkwgdmFsdWVzIGFsbG93ZWQgaGVyZSAuLi4gLS0+XG4gICAgPC9QaWN0dXJlRGV0YWlscz5cbiAgICA8UG9zdGFsQ29kZT4gc3RyaW5nIDwvUG9zdGFsQ29kZT5cbiAgICA8UG9zdENoZWNrb3V0RXhwZXJpZW5jZUVuYWJsZWQ+IGJvb2xlYW4gPC9Qb3N0Q2hlY2tvdXRFeHBlcmllbmNlRW5hYmxlZD5cbiAgICA8UHJpbWFyeUNhdGVnb3J5PiBDYXRlZ29yeVR5cGVcbiAgICAgIDxDYXRlZ29yeUlEPiBzdHJpbmcgPC9DYXRlZ29yeUlEPlxuICAgIDwvUHJpbWFyeUNhdGVnb3J5PlxuICAgIDxQcml2YXRlTGlzdGluZz4gYm9vbGVhbiA8L1ByaXZhdGVMaXN0aW5nPlxuICAgIDxQcm9kdWN0TGlzdGluZ0RldGFpbHM+IFByb2R1Y3RMaXN0aW5nRGV0YWlsc1R5cGVcbiAgICAgIDxCcmFuZE1QTj4gQnJhbmRNUE5UeXBlXG4gICAgICAgIDxCcmFuZD4gc3RyaW5nIDwvQnJhbmQ+XG4gICAgICAgIDxNUE4+IHN0cmluZyA8L01QTj5cbiAgICAgIDwvQnJhbmRNUE4+XG4gICAgICA8RUFOPiBzdHJpbmcgPC9FQU4+XG4gICAgICA8SW5jbHVkZWVCYXlQcm9kdWN0RGV0YWlscz4gYm9vbGVhbiA8L0luY2x1ZGVlQmF5UHJvZHVjdERldGFpbHM+XG4gICAgICA8SW5jbHVkZVN0b2NrUGhvdG9VUkw+IGJvb2xlYW4gPC9JbmNsdWRlU3RvY2tQaG90b1VSTD5cbiAgICAgIDxJU0JOPiBzdHJpbmcgPC9JU0JOPlxuICAgICAgPFByb2R1Y3RSZWZlcmVuY2VJRD4gc3RyaW5nIDwvUHJvZHVjdFJlZmVyZW5jZUlEPlxuICAgICAgPFJldHVyblNlYXJjaFJlc3VsdE9uRHVwbGljYXRlcz4gYm9vbGVhbiA8L1JldHVyblNlYXJjaFJlc3VsdE9uRHVwbGljYXRlcz5cbiAgICAgIDxUaWNrZXRMaXN0aW5nRGV0YWlscz4gVGlja2V0TGlzdGluZ0RldGFpbHNUeXBlXG4gICAgICAgIDxFdmVudFRpdGxlPiBzdHJpbmcgPC9FdmVudFRpdGxlPlxuICAgICAgICA8UHJpbnRlZERhdGU+IHN0cmluZyA8L1ByaW50ZWREYXRlPlxuICAgICAgICA8UHJpbnRlZFRpbWU+IHN0cmluZyA8L1ByaW50ZWRUaW1lPlxuICAgICAgICA8VmVudWU+IHN0cmluZyA8L1ZlbnVlPlxuICAgICAgPC9UaWNrZXRMaXN0aW5nRGV0YWlscz5cbiAgICAgIDxVUEM+IHN0cmluZyA8L1VQQz5cbiAgICAgIDxVc2VGaXJzdFByb2R1Y3Q+IGJvb2xlYW4gPC9Vc2VGaXJzdFByb2R1Y3Q+XG4gICAgICA8VXNlU3RvY2tQaG90b1VSTEFzR2FsbGVyeT4gYm9vbGVhbiA8L1VzZVN0b2NrUGhvdG9VUkxBc0dhbGxlcnk+XG4gICAgPC9Qcm9kdWN0TGlzdGluZ0RldGFpbHM+XG4gICAgPFF1YW50aXR5PiBpbnQgPC9RdWFudGl0eT5cbiAgICA8UXVhbnRpdHlJbmZvPiBRdWFudGl0eUluZm9UeXBlXG4gICAgICA8TWluaW11bVJlbW5hbnRTZXQ+IGludCA8L01pbmltdW1SZW1uYW50U2V0PlxuICAgIDwvUXVhbnRpdHlJbmZvPlxuICAgIDxSZXNlcnZlUHJpY2UgY3VycmVuY3lJRD1cIkN1cnJlbmN5Q29kZVR5cGVcIj4gQW1vdW50VHlwZSAoZG91YmxlKSA8L1Jlc2VydmVQcmljZT5cbiAgICA8UmV0dXJuUG9saWN5PiBSZXR1cm5Qb2xpY3lUeXBlXG4gICAgICA8RGVzY3JpcHRpb24+IHN0cmluZyA8L0Rlc2NyaXB0aW9uPlxuICAgICAgPEVBTj4gc3RyaW5nIDwvRUFOPlxuICAgICAgPEV4dGVuZGVkSG9saWRheVJldHVybnM+IGJvb2xlYW4gPC9FeHRlbmRlZEhvbGlkYXlSZXR1cm5zPlxuICAgICAgPFJlZnVuZE9wdGlvbj4gdG9rZW4gPC9SZWZ1bmRPcHRpb24+XG4gICAgICA8UmVzdG9ja2luZ0ZlZVZhbHVlT3B0aW9uPiB0b2tlbiA8L1Jlc3RvY2tpbmdGZWVWYWx1ZU9wdGlvbj5cbiAgICAgIDxSZXR1cm5zQWNjZXB0ZWRPcHRpb24+IHRva2VuIDwvUmV0dXJuc0FjY2VwdGVkT3B0aW9uPlxuICAgICAgPFJldHVybnNXaXRoaW5PcHRpb24+IHRva2VuIDwvUmV0dXJuc1dpdGhpbk9wdGlvbj5cbiAgICAgIDxTaGlwcGluZ0Nvc3RQYWlkQnlPcHRpb24+IHRva2VuIDwvU2hpcHBpbmdDb3N0UGFpZEJ5T3B0aW9uPlxuICAgICAgPFdhcnJhbnR5RHVyYXRpb25PcHRpb24+IHRva2VuIDwvV2FycmFudHlEdXJhdGlvbk9wdGlvbj5cbiAgICAgIDxXYXJyYW50eU9mZmVyZWRPcHRpb24+IHRva2VuIDwvV2FycmFudHlPZmZlcmVkT3B0aW9uPlxuICAgICAgPFdhcnJhbnR5VHlwZU9wdGlvbj4gdG9rZW4gPC9XYXJyYW50eVR5cGVPcHRpb24+XG4gICAgPC9SZXR1cm5Qb2xpY3k+XG4gICAgPFNjaGVkdWxlVGltZT4gZGF0ZVRpbWUgPC9TY2hlZHVsZVRpbWU+XG4gICAgPFNlY29uZGFyeUNhdGVnb3J5PiBDYXRlZ29yeVR5cGVcbiAgICAgIDxDYXRlZ29yeUlEPiBzdHJpbmcgPC9DYXRlZ29yeUlEPlxuICAgIDwvU2Vjb25kYXJ5Q2F0ZWdvcnk+XG4gICAgPFNlbGxlcj4gVXNlclR5cGVcbiAgICAgIDxNb3RvcnNEZWFsZXI+IGJvb2xlYW4gPC9Nb3RvcnNEZWFsZXI+XG4gICAgPC9TZWxsZXI+XG4gICAgPFNlbGxlckNvbnRhY3REZXRhaWxzPiBBZGRyZXNzVHlwZVxuICAgICAgPENvbXBhbnlOYW1lPiBzdHJpbmcgPC9Db21wYW55TmFtZT5cbiAgICAgIDxDb3VudHk+IHN0cmluZyA8L0NvdW50eT5cbiAgICAgIDxQaG9uZTJBcmVhT3JDaXR5Q29kZT4gc3RyaW5nIDwvUGhvbmUyQXJlYU9yQ2l0eUNvZGU+XG4gICAgICA8UGhvbmUyQ291bnRyeUNvZGU+IENvdW50cnlDb2RlVHlwZSA8L1Bob25lMkNvdW50cnlDb2RlPlxuICAgICAgPFBob25lMkxvY2FsTnVtYmVyPiBzdHJpbmcgPC9QaG9uZTJMb2NhbE51bWJlcj5cbiAgICAgIDxQaG9uZUFyZWFPckNpdHlDb2RlPiBzdHJpbmcgPC9QaG9uZUFyZWFPckNpdHlDb2RlPlxuICAgICAgPFBob25lQ291bnRyeUNvZGU+IENvdW50cnlDb2RlVHlwZSA8L1Bob25lQ291bnRyeUNvZGU+XG4gICAgICA8UGhvbmVMb2NhbE51bWJlcj4gc3RyaW5nIDwvUGhvbmVMb2NhbE51bWJlcj5cbiAgICAgIDxTdHJlZXQ+IHN0cmluZyA8L1N0cmVldD5cbiAgICAgIDxTdHJlZXQyPiBzdHJpbmcgPC9TdHJlZXQyPlxuICAgIDwvU2VsbGVyQ29udGFjdERldGFpbHM+XG4gICAgPFNlbGxlckludmVudG9yeUlEPiBzdHJpbmcgPC9TZWxsZXJJbnZlbnRvcnlJRD5cbiAgICA8U2VsbGVyUHJvZmlsZXM+IFNlbGxlclByb2ZpbGVzVHlwZVxuICAgICAgPFNlbGxlclBheW1lbnRQcm9maWxlPiBTZWxsZXJQYXltZW50UHJvZmlsZVR5cGVcbiAgICAgICAgPFBheW1lbnRQcm9maWxlSUQ+IGxvbmcgPC9QYXltZW50UHJvZmlsZUlEPlxuICAgICAgICA8UGF5bWVudFByb2ZpbGVOYW1lPiBzdHJpbmcgPC9QYXltZW50UHJvZmlsZU5hbWU+XG4gICAgICA8L1NlbGxlclBheW1lbnRQcm9maWxlPlxuICAgICAgPFNlbGxlclJldHVyblByb2ZpbGU+IFNlbGxlclJldHVyblByb2ZpbGVUeXBlXG4gICAgICAgIDxSZXR1cm5Qcm9maWxlSUQ+IGxvbmcgPC9SZXR1cm5Qcm9maWxlSUQ+XG4gICAgICAgIDxSZXR1cm5Qcm9maWxlTmFtZT4gc3RyaW5nIDwvUmV0dXJuUHJvZmlsZU5hbWU+XG4gICAgICA8L1NlbGxlclJldHVyblByb2ZpbGU+XG4gICAgICA8U2VsbGVyU2hpcHBpbmdQcm9maWxlPiBTZWxsZXJTaGlwcGluZ1Byb2ZpbGVUeXBlXG4gICAgICAgIDxTaGlwcGluZ1Byb2ZpbGVJRD4gbG9uZyA8L1NoaXBwaW5nUHJvZmlsZUlEPlxuICAgICAgICA8U2hpcHBpbmdQcm9maWxlTmFtZT4gc3RyaW5nIDwvU2hpcHBpbmdQcm9maWxlTmFtZT5cbiAgICAgIDwvU2VsbGVyU2hpcHBpbmdQcm9maWxlPlxuICAgIDwvU2VsbGVyUHJvZmlsZXM+XG4gICAgPFNlbGxlclByb3ZpZGVkVGl0bGU+IHN0cmluZyA8L1NlbGxlclByb3ZpZGVkVGl0bGU+XG4gICAgPFNoaXBwaW5nRGV0YWlscz4gU2hpcHBpbmdEZXRhaWxzVHlwZVxuICAgICAgPENhbGN1bGF0ZWRTaGlwcGluZ1JhdGU+IENhbGN1bGF0ZWRTaGlwcGluZ1JhdGVUeXBlXG4gICAgICAgIDxJbnRlcm5hdGlvbmFsUGFja2FnaW5nSGFuZGxpbmdDb3N0cyBjdXJyZW5jeUlEPVwiQ3VycmVuY3lDb2RlVHlwZVwiPiBBbW91bnRUeXBlIChkb3VibGUpIDwvSW50ZXJuYXRpb25hbFBhY2thZ2luZ0hhbmRsaW5nQ29zdHM+XG4gICAgICAgIDxNZWFzdXJlbWVudFVuaXQ+IE1lYXN1cmVtZW50U3lzdGVtQ29kZVR5cGUgPC9NZWFzdXJlbWVudFVuaXQ+XG4gICAgICAgIDxPcmlnaW5hdGluZ1Bvc3RhbENvZGU+IHN0cmluZyA8L09yaWdpbmF0aW5nUG9zdGFsQ29kZT5cbiAgICAgICAgPFBhY2thZ2VEZXB0aCB1bml0PVwidG9rZW5cIiBtZWFzdXJlbWVudFN5c3RlbT1cIk1lYXN1cmVtZW50U3lzdGVtQ29kZVR5cGVcIj4gTWVhc3VyZVR5cGUgKGRlY2ltYWwpIDwvUGFja2FnZURlcHRoPlxuICAgICAgICA8UGFja2FnZUxlbmd0aCB1bml0PVwidG9rZW5cIiBtZWFzdXJlbWVudFN5c3RlbT1cIk1lYXN1cmVtZW50U3lzdGVtQ29kZVR5cGVcIj4gTWVhc3VyZVR5cGUgKGRlY2ltYWwpIDwvUGFja2FnZUxlbmd0aD5cbiAgICAgICAgPFBhY2thZ2VXaWR0aCB1bml0PVwidG9rZW5cIiBtZWFzdXJlbWVudFN5c3RlbT1cIk1lYXN1cmVtZW50U3lzdGVtQ29kZVR5cGVcIj4gTWVhc3VyZVR5cGUgKGRlY2ltYWwpIDwvUGFja2FnZVdpZHRoPlxuICAgICAgICA8UGFja2FnaW5nSGFuZGxpbmdDb3N0cyBjdXJyZW5jeUlEPVwiQ3VycmVuY3lDb2RlVHlwZVwiPiBBbW91bnRUeXBlIChkb3VibGUpIDwvUGFja2FnaW5nSGFuZGxpbmdDb3N0cz5cbiAgICAgICAgPFNoaXBwaW5nSXJyZWd1bGFyPiBib29sZWFuIDwvU2hpcHBpbmdJcnJlZ3VsYXI+XG4gICAgICAgIDxTaGlwcGluZ1BhY2thZ2U+IFNoaXBwaW5nUGFja2FnZUNvZGVUeXBlIDwvU2hpcHBpbmdQYWNrYWdlPlxuICAgICAgICA8V2VpZ2h0TWFqb3IgdW5pdD1cInRva2VuXCIgbWVhc3VyZW1lbnRTeXN0ZW09XCJNZWFzdXJlbWVudFN5c3RlbUNvZGVUeXBlXCI+IE1lYXN1cmVUeXBlIChkZWNpbWFsKSA8L1dlaWdodE1ham9yPlxuICAgICAgICA8V2VpZ2h0TWlub3IgdW5pdD1cInRva2VuXCIgbWVhc3VyZW1lbnRTeXN0ZW09XCJNZWFzdXJlbWVudFN5c3RlbUNvZGVUeXBlXCI+IE1lYXN1cmVUeXBlIChkZWNpbWFsKSA8L1dlaWdodE1pbm9yPlxuICAgICAgPC9DYWxjdWxhdGVkU2hpcHBpbmdSYXRlPlxuICAgICAgPENPRENvc3QgY3VycmVuY3lJRD1cIkN1cnJlbmN5Q29kZVR5cGVcIj4gQW1vdW50VHlwZSAoZG91YmxlKSA8L0NPRENvc3Q+XG4gICAgICA8RXhjbHVkZVNoaXBUb0xvY2F0aW9uPiBzdHJpbmcgPC9FeGNsdWRlU2hpcFRvTG9jYXRpb24+XG4gICAgICA8IS0tIC4uLiBtb3JlIEV4Y2x1ZGVTaGlwVG9Mb2NhdGlvbiB2YWx1ZXMgYWxsb3dlZCBoZXJlIC4uLiAtLT5cbiAgICAgIDxHbG9iYWxTaGlwcGluZz4gYm9vbGVhbiA8L0dsb2JhbFNoaXBwaW5nPlxuICAgICAgPEluc3VyYW5jZURldGFpbHM+IEluc3VyYW5jZURldGFpbHNUeXBlXG4gICAgICAgIDxJbnN1cmFuY2VGZWUgY3VycmVuY3lJRD1cIkN1cnJlbmN5Q29kZVR5cGVcIj4gQW1vdW50VHlwZSAoZG91YmxlKSA8L0luc3VyYW5jZUZlZT5cbiAgICAgICAgPEluc3VyYW5jZU9wdGlvbj4gSW5zdXJhbmNlT3B0aW9uQ29kZVR5cGUgPC9JbnN1cmFuY2VPcHRpb24+XG4gICAgICA8L0luc3VyYW5jZURldGFpbHM+XG4gICAgICA8SW5zdXJhbmNlRmVlIGN1cnJlbmN5SUQ9XCJDdXJyZW5jeUNvZGVUeXBlXCI+IEFtb3VudFR5cGUgKGRvdWJsZSkgPC9JbnN1cmFuY2VGZWU+XG4gICAgICA8SW5zdXJhbmNlT3B0aW9uPiBJbnN1cmFuY2VPcHRpb25Db2RlVHlwZSA8L0luc3VyYW5jZU9wdGlvbj5cbiAgICAgIDxJbnRlcm5hdGlvbmFsSW5zdXJhbmNlRGV0YWlscz4gSW5zdXJhbmNlRGV0YWlsc1R5cGVcbiAgICAgICAgPEluc3VyYW5jZUZlZSBjdXJyZW5jeUlEPVwiQ3VycmVuY3lDb2RlVHlwZVwiPiBBbW91bnRUeXBlIChkb3VibGUpIDwvSW5zdXJhbmNlRmVlPlxuICAgICAgICA8SW5zdXJhbmNlT3B0aW9uPiBJbnN1cmFuY2VPcHRpb25Db2RlVHlwZSA8L0luc3VyYW5jZU9wdGlvbj5cbiAgICAgIDwvSW50ZXJuYXRpb25hbEluc3VyYW5jZURldGFpbHM+XG4gICAgICA8SW50ZXJuYXRpb25hbFByb21vdGlvbmFsU2hpcHBpbmdEaXNjb3VudD4gYm9vbGVhbiA8L0ludGVybmF0aW9uYWxQcm9tb3Rpb25hbFNoaXBwaW5nRGlzY291bnQ+XG4gICAgICA8SW50ZXJuYXRpb25hbFNoaXBwaW5nRGlzY291bnRQcm9maWxlSUQ+IHN0cmluZyA8L0ludGVybmF0aW9uYWxTaGlwcGluZ0Rpc2NvdW50UHJvZmlsZUlEPlxuICAgICAgPEludGVybmF0aW9uYWxTaGlwcGluZ1NlcnZpY2VPcHRpb24+IEludGVybmF0aW9uYWxTaGlwcGluZ1NlcnZpY2VPcHRpb25zVHlwZVxuICAgICAgICA8U2hpcHBpbmdTZXJ2aWNlPiB0b2tlbiA8L1NoaXBwaW5nU2VydmljZT5cbiAgICAgICAgPFNoaXBwaW5nU2VydmljZUFkZGl0aW9uYWxDb3N0IGN1cnJlbmN5SUQ9XCJDdXJyZW5jeUNvZGVUeXBlXCI+IEFtb3VudFR5cGUgKGRvdWJsZSkgPC9TaGlwcGluZ1NlcnZpY2VBZGRpdGlvbmFsQ29zdD5cbiAgICAgICAgPFNoaXBwaW5nU2VydmljZUNvc3QgY3VycmVuY3lJRD1cIkN1cnJlbmN5Q29kZVR5cGVcIj4gQW1vdW50VHlwZSAoZG91YmxlKSA8L1NoaXBwaW5nU2VydmljZUNvc3Q+XG4gICAgICAgIDxTaGlwcGluZ1NlcnZpY2VQcmlvcml0eT4gaW50IDwvU2hpcHBpbmdTZXJ2aWNlUHJpb3JpdHk+XG4gICAgICAgIDxTaGlwVG9Mb2NhdGlvbj4gc3RyaW5nIDwvU2hpcFRvTG9jYXRpb24+XG4gICAgICAgIDwhLS0gLi4uIG1vcmUgU2hpcFRvTG9jYXRpb24gdmFsdWVzIGFsbG93ZWQgaGVyZSAuLi4gLS0+XG4gICAgICA8L0ludGVybmF0aW9uYWxTaGlwcGluZ1NlcnZpY2VPcHRpb24+XG4gICAgICA8IS0tIC4uLiBtb3JlIEludGVybmF0aW9uYWxTaGlwcGluZ1NlcnZpY2VPcHRpb24gbm9kZXMgYWxsb3dlZCBoZXJlIC4uLiAtLT5cbiAgICAgIDxQYXltZW50SW5zdHJ1Y3Rpb25zPiBzdHJpbmcgPC9QYXltZW50SW5zdHJ1Y3Rpb25zPlxuICAgICAgPFByb21vdGlvbmFsU2hpcHBpbmdEaXNjb3VudD4gYm9vbGVhbiA8L1Byb21vdGlvbmFsU2hpcHBpbmdEaXNjb3VudD5cbiAgICAgIDxSYXRlVGFibGVEZXRhaWxzPiBSYXRlVGFibGVEZXRhaWxzVHlwZVxuICAgICAgICA8RG9tZXN0aWNSYXRlVGFibGU+IHN0cmluZyA8L0RvbWVzdGljUmF0ZVRhYmxlPlxuICAgICAgICA8SW50ZXJuYXRpb25hbFJhdGVUYWJsZT4gc3RyaW5nIDwvSW50ZXJuYXRpb25hbFJhdGVUYWJsZT5cbiAgICAgIDwvUmF0ZVRhYmxlRGV0YWlscz5cbiAgICAgIDxTYWxlc1RheD4gU2FsZXNUYXhUeXBlXG4gICAgICAgIDxTYWxlc1RheFBlcmNlbnQ+IGZsb2F0IDwvU2FsZXNUYXhQZXJjZW50PlxuICAgICAgICA8U2FsZXNUYXhTdGF0ZT4gc3RyaW5nIDwvU2FsZXNUYXhTdGF0ZT5cbiAgICAgICAgPFNoaXBwaW5nSW5jbHVkZWRJblRheD4gYm9vbGVhbiA8L1NoaXBwaW5nSW5jbHVkZWRJblRheD5cbiAgICAgIDwvU2FsZXNUYXg+XG4gICAgICA8U2hpcHBpbmdEaXNjb3VudFByb2ZpbGVJRD4gc3RyaW5nIDwvU2hpcHBpbmdEaXNjb3VudFByb2ZpbGVJRD5cbiAgICAgIDxTaGlwcGluZ1NlcnZpY2VPcHRpb25zPiBTaGlwcGluZ1NlcnZpY2VPcHRpb25zVHlwZVxuICAgICAgICA8RnJlZVNoaXBwaW5nPiBib29sZWFuIDwvRnJlZVNoaXBwaW5nPlxuICAgICAgICA8U2hpcHBpbmdTZXJ2aWNlPiB0b2tlbiA8L1NoaXBwaW5nU2VydmljZT5cbiAgICAgICAgPFNoaXBwaW5nU2VydmljZUFkZGl0aW9uYWxDb3N0IGN1cnJlbmN5SUQ9XCJDdXJyZW5jeUNvZGVUeXBlXCI+IEFtb3VudFR5cGUgKGRvdWJsZSkgPC9TaGlwcGluZ1NlcnZpY2VBZGRpdGlvbmFsQ29zdD5cbiAgICAgICAgPFNoaXBwaW5nU2VydmljZUNvc3QgY3VycmVuY3lJRD1cIkN1cnJlbmN5Q29kZVR5cGVcIj4gQW1vdW50VHlwZSAoZG91YmxlKSA8L1NoaXBwaW5nU2VydmljZUNvc3Q+XG4gICAgICAgIDxTaGlwcGluZ1NlcnZpY2VQcmlvcml0eT4gaW50IDwvU2hpcHBpbmdTZXJ2aWNlUHJpb3JpdHk+XG4gICAgICAgIDxTaGlwcGluZ1N1cmNoYXJnZSBjdXJyZW5jeUlEPVwiQ3VycmVuY3lDb2RlVHlwZVwiPiBBbW91bnRUeXBlIChkb3VibGUpIDwvU2hpcHBpbmdTdXJjaGFyZ2U+XG4gICAgICA8L1NoaXBwaW5nU2VydmljZU9wdGlvbnM+XG4gICAgICA8IS0tIC4uLiBtb3JlIFNoaXBwaW5nU2VydmljZU9wdGlvbnMgbm9kZXMgYWxsb3dlZCBoZXJlIC4uLiAtLT5cbiAgICAgIDxTaGlwcGluZ1R5cGU+IFNoaXBwaW5nVHlwZUNvZGVUeXBlIDwvU2hpcHBpbmdUeXBlPlxuICAgIDwvU2hpcHBpbmdEZXRhaWxzPlxuICAgIDxTaGlwcGluZ1BhY2thZ2VEZXRhaWxzPiBTaGlwUGFja2FnZURldGFpbHNUeXBlXG4gICAgICA8TWVhc3VyZW1lbnRVbml0PiBNZWFzdXJlbWVudFN5c3RlbUNvZGVUeXBlIDwvTWVhc3VyZW1lbnRVbml0PlxuICAgICAgPFBhY2thZ2VEZXB0aCB1bml0PVwidG9rZW5cIiBtZWFzdXJlbWVudFN5c3RlbT1cIk1lYXN1cmVtZW50U3lzdGVtQ29kZVR5cGVcIj4gTWVhc3VyZVR5cGUgKGRlY2ltYWwpIDwvUGFja2FnZURlcHRoPlxuICAgICAgPFBhY2thZ2VMZW5ndGggdW5pdD1cInRva2VuXCIgbWVhc3VyZW1lbnRTeXN0ZW09XCJNZWFzdXJlbWVudFN5c3RlbUNvZGVUeXBlXCI+IE1lYXN1cmVUeXBlIChkZWNpbWFsKSA8L1BhY2thZ2VMZW5ndGg+XG4gICAgICA8UGFja2FnZVdpZHRoIHVuaXQ9XCJ0b2tlblwiIG1lYXN1cmVtZW50U3lzdGVtPVwiTWVhc3VyZW1lbnRTeXN0ZW1Db2RlVHlwZVwiPiBNZWFzdXJlVHlwZSAoZGVjaW1hbCkgPC9QYWNrYWdlV2lkdGg+XG4gICAgICA8U2hpcHBpbmdJcnJlZ3VsYXI+IGJvb2xlYW4gPC9TaGlwcGluZ0lycmVndWxhcj5cbiAgICAgIDxTaGlwcGluZ1BhY2thZ2U+IFNoaXBwaW5nUGFja2FnZUNvZGVUeXBlIDwvU2hpcHBpbmdQYWNrYWdlPlxuICAgICAgPFdlaWdodE1ham9yIHVuaXQ9XCJ0b2tlblwiIG1lYXN1cmVtZW50U3lzdGVtPVwiTWVhc3VyZW1lbnRTeXN0ZW1Db2RlVHlwZVwiPiBNZWFzdXJlVHlwZSAoZGVjaW1hbCkgPC9XZWlnaHRNYWpvcj5cbiAgICAgIDxXZWlnaHRNaW5vciB1bml0PVwidG9rZW5cIiBtZWFzdXJlbWVudFN5c3RlbT1cIk1lYXN1cmVtZW50U3lzdGVtQ29kZVR5cGVcIj4gTWVhc3VyZVR5cGUgKGRlY2ltYWwpIDwvV2VpZ2h0TWlub3I+XG4gICAgPC9TaGlwcGluZ1BhY2thZ2VEZXRhaWxzPlxuICAgIDxTaGlwcGluZ1NlcnZpY2VDb3N0T3ZlcnJpZGVMaXN0PiBTaGlwcGluZ1NlcnZpY2VDb3N0T3ZlcnJpZGVMaXN0VHlwZVxuICAgICAgPFNoaXBwaW5nU2VydmljZUNvc3RPdmVycmlkZT4gU2hpcHBpbmdTZXJ2aWNlQ29zdE92ZXJyaWRlVHlwZVxuICAgICAgICA8U2hpcHBpbmdTZXJ2aWNlQWRkaXRpb25hbENvc3QgY3VycmVuY3lJRD1cIkN1cnJlbmN5Q29kZVR5cGVcIj4gQW1vdW50VHlwZSAoZG91YmxlKSA8L1NoaXBwaW5nU2VydmljZUFkZGl0aW9uYWxDb3N0PlxuICAgICAgICA8U2hpcHBpbmdTZXJ2aWNlQ29zdCBjdXJyZW5jeUlEPVwiQ3VycmVuY3lDb2RlVHlwZVwiPiBBbW91bnRUeXBlIChkb3VibGUpIDwvU2hpcHBpbmdTZXJ2aWNlQ29zdD5cbiAgICAgICAgPFNoaXBwaW5nU2VydmljZVByaW9yaXR5PiBpbnQgPC9TaGlwcGluZ1NlcnZpY2VQcmlvcml0eT5cbiAgICAgICAgPFNoaXBwaW5nU2VydmljZVR5cGU+IFNoaXBwaW5nU2VydmljZVR5cGUgPC9TaGlwcGluZ1NlcnZpY2VUeXBlPlxuICAgICAgICA8U2hpcHBpbmdTdXJjaGFyZ2UgY3VycmVuY3lJRD1cIkN1cnJlbmN5Q29kZVR5cGVcIj4gQW1vdW50VHlwZSAoZG91YmxlKSA8L1NoaXBwaW5nU3VyY2hhcmdlPlxuICAgICAgPC9TaGlwcGluZ1NlcnZpY2VDb3N0T3ZlcnJpZGU+XG4gICAgICA8IS0tIC4uLiBtb3JlIFNoaXBwaW5nU2VydmljZUNvc3RPdmVycmlkZSBub2RlcyBhbGxvd2VkIGhlcmUgLi4uIC0tPlxuICAgIDwvU2hpcHBpbmdTZXJ2aWNlQ29zdE92ZXJyaWRlTGlzdD5cbiAgICA8U2hpcHBpbmdUZXJtc0luRGVzY3JpcHRpb24+IGJvb2xlYW4gPC9TaGlwcGluZ1Rlcm1zSW5EZXNjcmlwdGlvbj5cbiAgICA8U2hpcFRvTG9jYXRpb25zPiBzdHJpbmcgPC9TaGlwVG9Mb2NhdGlvbnM+XG4gICAgPCEtLSAuLi4gbW9yZSBTaGlwVG9Mb2NhdGlvbnMgdmFsdWVzIGFsbG93ZWQgaGVyZSAuLi4gLS0+XG4gICAgPFNpdGU+IFNpdGVDb2RlVHlwZSA8L1NpdGU+XG4gICAgPFNLVT4gU0tVVHlwZSAoc3RyaW5nKSA8L1NLVT5cbiAgICA8U2t5cGVDb250YWN0T3B0aW9uPiBTa3lwZUNvbnRhY3RPcHRpb25Db2RlVHlwZSA8L1NreXBlQ29udGFjdE9wdGlvbj5cbiAgICA8IS0tIC4uLiBtb3JlIFNreXBlQ29udGFjdE9wdGlvbiB2YWx1ZXMgYWxsb3dlZCBoZXJlIC4uLiAtLT5cbiAgICA8U2t5cGVFbmFibGVkPiBib29sZWFuIDwvU2t5cGVFbmFibGVkPlxuICAgIDxTa3lwZUlEPiBzdHJpbmcgPC9Ta3lwZUlEPlxuICAgIDxTdGFydFByaWNlIGN1cnJlbmN5SUQ9XCJDdXJyZW5jeUNvZGVUeXBlXCI+IEFtb3VudFR5cGUgKGRvdWJsZSkgPC9TdGFydFByaWNlPlxuICAgIDxTdG9yZWZyb250PiBTdG9yZWZyb250VHlwZVxuICAgICAgPFN0b3JlQ2F0ZWdvcnkySUQ+IGxvbmcgPC9TdG9yZUNhdGVnb3J5MklEPlxuICAgICAgPFN0b3JlQ2F0ZWdvcnkyTmFtZT4gc3RyaW5nIDwvU3RvcmVDYXRlZ29yeTJOYW1lPlxuICAgICAgPFN0b3JlQ2F0ZWdvcnlJRD4gbG9uZyA8L1N0b3JlQ2F0ZWdvcnlJRD5cbiAgICAgIDxTdG9yZUNhdGVnb3J5TmFtZT4gc3RyaW5nIDwvU3RvcmVDYXRlZ29yeU5hbWU+XG4gICAgPC9TdG9yZWZyb250PlxuICAgIDxTdWJUaXRsZT4gc3RyaW5nIDwvU3ViVGl0bGU+XG4gICAgPFRheENhdGVnb3J5PiBzdHJpbmcgPC9UYXhDYXRlZ29yeT5cbiAgICA8VGhpcmRQYXJ0eUNoZWNrb3V0PiBib29sZWFuIDwvVGhpcmRQYXJ0eUNoZWNrb3V0PlxuICAgIDxUaGlyZFBhcnR5Q2hlY2tvdXRJbnRlZ3JhdGlvbj4gYm9vbGVhbiA8L1RoaXJkUGFydHlDaGVja291dEludGVncmF0aW9uPlxuICAgIDxUaXRsZT4gc3RyaW5nIDwvVGl0bGU+XG4gICAgPFVzZVJlY29tbWVuZGVkUHJvZHVjdD4gYm9vbGVhbiA8L1VzZVJlY29tbWVuZGVkUHJvZHVjdD5cbiAgICA8VXNlVGF4VGFibGU+IGJvb2xlYW4gPC9Vc2VUYXhUYWJsZT5cbiAgICA8VVVJRD4gVVVJRFR5cGUgKHN0cmluZykgPC9VVUlEPlxuICAgIDxWQVREZXRhaWxzPiBWQVREZXRhaWxzVHlwZVxuICAgICAgPEJ1c2luZXNzU2VsbGVyPiBib29sZWFuIDwvQnVzaW5lc3NTZWxsZXI+XG4gICAgICA8UmVzdHJpY3RlZFRvQnVzaW5lc3M+IGJvb2xlYW4gPC9SZXN0cmljdGVkVG9CdXNpbmVzcz5cbiAgICAgIDxWQVRQZXJjZW50PiBmbG9hdCA8L1ZBVFBlcmNlbnQ+XG4gICAgPC9WQVREZXRhaWxzPlxuICAgIDxWSU4+IHN0cmluZyA8L1ZJTj5cbiAgICA8VlJNPiBzdHJpbmcgPC9WUk0+XG4gIDwvSXRlbT5cbiAgPCEtLSBTdGFuZGFyZCBJbnB1dCBGaWVsZHMgLS0+XG4gIDxFcnJvckhhbmRsaW5nPiBFcnJvckhhbmRsaW5nQ29kZVR5cGUgPC9FcnJvckhhbmRsaW5nPlxuICA8RXJyb3JMYW5ndWFnZT4gc3RyaW5nIDwvRXJyb3JMYW5ndWFnZT5cbiAgPE1lc3NhZ2VJRD4gc3RyaW5nIDwvTWVzc2FnZUlEPlxuICA8VmVyc2lvbj4gc3RyaW5nIDwvVmVyc2lvbj5cbiAgPFdhcm5pbmdMZXZlbD4gV2FybmluZ0xldmVsQ29kZVR5cGUgPC9XYXJuaW5nTGV2ZWw+XG48L0FkZEl0ZW1SZXF1ZXN0PlxuKi8iXX0=